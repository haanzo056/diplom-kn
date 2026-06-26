import { prisma } from '@/lib/prisma';
import { unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const media = await prisma.mediaFile.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  try {
    const filePath = path.join(process.cwd(), 'public', media.url);
    await unlink(filePath);
  } catch {
    // file may already be missing on disk
  }

  await prisma.mediaFile.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
