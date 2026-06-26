import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const post = await prisma.post.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt ?? null,
      status: body.status ?? 'DRAFT',
      category: body.category ?? 'OTHER',
      blocks: body.blocks ?? [],
      pageId: body.pageId ?? null,
      publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
    },
  });
  return NextResponse.json(post);
}
