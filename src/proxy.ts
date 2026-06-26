import { verifyAccessToken, verifyRefreshToken, signAccessToken } from '@/lib/tokens';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ACCESS_MAX_AGE = 15 * 60;

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAdminRoute = path.startsWith('/admin');
  const isLoginRoute = path === '/login';

  const accessToken = req.cookies.get('access_token')?.value;
  let session = await verifyAccessToken(accessToken);

  // Access token expired → try silent refresh via refresh token
  if (!session) {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    const refreshPayload = await verifyRefreshToken(refreshToken);

    if (refreshPayload) {
      const newAccessToken = await signAccessToken(refreshPayload.userId, refreshPayload.role);

      if (isAdminRoute) {
        const response = NextResponse.next();
        response.cookies.set('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: ACCESS_MAX_AGE,
          sameSite: 'lax',
          path: '/',
        });
        return response;
      }

      // For login redirect with fresh token
      session = refreshPayload;
    }
  }

  if (isAdminRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isLoginRoute && session?.userId) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
