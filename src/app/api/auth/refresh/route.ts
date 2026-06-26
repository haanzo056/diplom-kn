import { prisma } from '@/lib/prisma';
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from '@/lib/tokens';
import { NextRequest, NextResponse } from 'next/server';

const ACCESS_MAX_AGE = 15 * 60;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60;

const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function POST(req: NextRequest) {
  const rawRefreshToken = req.cookies.get('refresh_token')?.value;
  const payload = await verifyRefreshToken(rawRefreshToken);

  if (!payload) {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }

  // Verify token hash against DB
  const tokenHash = await hashToken(rawRefreshToken!);
  const user = await prisma.user.findFirst({
    where: {
      id: payload.userId,
      refreshTokenHash: tokenHash,
      refreshTokenExpiresAt: { gt: new Date() },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Refresh token revoked' }, { status: 401 });
  }

  // Issue new access token
  const newAccessToken = await signAccessToken(user.id, user.role);

  // Rotate refresh token
  const newRefreshToken = await signRefreshToken(user.id, user.role);
  const newRefreshHash = await hashToken(newRefreshToken);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshTokenHash: newRefreshHash,
      refreshTokenExpiresAt: new Date(Date.now() + REFRESH_MAX_AGE * 1000),
    },
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set('access_token', newAccessToken, { ...cookieBase, maxAge: ACCESS_MAX_AGE });
  res.cookies.set('refresh_token', newRefreshToken, { ...cookieBase, maxAge: REFRESH_MAX_AGE });
  return res;
}
