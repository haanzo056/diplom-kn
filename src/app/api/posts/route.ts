import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get('pageId');

  const posts = await prisma.post.findMany({
    where: pageId ? { pageId } : undefined,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, status: true, category: true, publishedAt: true },
  });

  return NextResponse.json(posts);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
