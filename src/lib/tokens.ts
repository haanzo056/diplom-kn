import { SignJWT, jwtVerify } from 'jose';

export type AccessPayload = { userId: string; role: string };
export type RefreshPayload = { userId: string; role: string };

function accessSecret() {
  return new TextEncoder().encode(process.env.SESSION_SECRET);
}

function refreshSecret() {
  return new TextEncoder().encode((process.env.SESSION_SECRET ?? '') + '_refresh');
}

export async function signAccessToken(userId: string, role: string): Promise<string> {
  return new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(accessSecret());
}

export async function verifyAccessToken(token?: string): Promise<AccessPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, accessSecret(), { algorithms: ['HS256'] });
    return payload as AccessPayload;
  } catch {
    return null;
  }
}

export async function signRefreshToken(userId: string, role: string): Promise<string> {
  return new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(refreshSecret());
}

export async function verifyRefreshToken(token?: string): Promise<RefreshPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, refreshSecret(), { algorithms: ['HS256'] });
    return payload as RefreshPayload;
  } catch {
    return null;
  }
}

export async function hashToken(raw: string): Promise<string> {
  const data = new TextEncoder().encode(raw);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
