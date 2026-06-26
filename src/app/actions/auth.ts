'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/session';
import { hashToken } from '@/lib/tokens';

type LoginState = { error?: string } | undefined;

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Введіть email та пароль' };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.passwordHash) {
    return { error: 'Невірний email або пароль' };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: 'Невірний email або пароль' };
  }

  const { refreshTokenHash } = await createSession(user.id, user.role);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshTokenHash,
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  redirect('/admin');
}

export async function logout() {
  const { getSession } = await import('@/lib/session');
  const session = await getSession();

  if (session?.userId) {
    await prisma.user.update({
      where: { id: session.userId },
      data: { refreshTokenHash: null, refreshTokenExpiresAt: null },
    });
  }

  await deleteSession();
  redirect('/login');
}
