import 'server-only';
import { cookies } from 'next/headers';
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  hashToken,
  type AccessPayload,
} from './tokens';

export type { AccessPayload };

const ACCESS_MAX_AGE = 15 * 60; // 15 min
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function createSession(userId: string, role: string) {
  const cookieStore = await cookies();

  const accessToken = await signAccessToken(userId, role);
  cookieStore.set('access_token', accessToken, {
    ...cookieBase,
    maxAge: ACCESS_MAX_AGE,
  });

  const refreshToken = await signRefreshToken(userId, role);
  cookieStore.set('refresh_token', refreshToken, {
    ...cookieBase,
    maxAge: REFRESH_MAX_AGE,
  });

  return { refreshToken, refreshTokenHash: await hashToken(refreshToken) };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}

export async function getSession(): Promise<AccessPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  return verifyAccessToken(token);
}

// Kept for backward compat (proxy.ts uses decrypt)
export { verifyAccessToken as decrypt };
