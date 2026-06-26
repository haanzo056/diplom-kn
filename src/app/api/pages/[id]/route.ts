import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(page);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const page = await prisma.page.update({
    where: { id },
    data: {
      title: body.title,
      slug: body.slug,
      status: body.status ?? 'DRAFT',
      ...(body.content !== undefined && { content: body.content }),
    },
  });
  return NextResponse.json(page);
}
