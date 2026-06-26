import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
      status: 'PUBLISHED',
    },
    include: {
      author: { select: { name: true } },
    },
  });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}
