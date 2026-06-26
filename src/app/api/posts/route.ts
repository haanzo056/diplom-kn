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

export async function POST(req: NextRequest) {
  const body = await req.json();

  let slug = body.slug as string;
  const existing = await prisma.post.findMany({
    where: { slug: { startsWith: slug } },
    select: { slug: true },
  });
  if (existing.length > 0) {
    const taken = new Set(existing.map((p) => p.slug));
    let i = 2;
    while (taken.has(`${slug}-${i}`)) i++;
    slug = `${slug}-${i}`;
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      slug,
      excerpt: body.excerpt ?? null,
      status: body.status ?? 'DRAFT',
      category: body.category ?? 'OTHER',
      blocks: body.blocks ?? [],
      pageId: body.pageId ?? null,
      publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
    },
  });
  return NextResponse.json(post, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
