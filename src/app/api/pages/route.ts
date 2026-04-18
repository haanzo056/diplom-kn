import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const pages = await prisma.page.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(pages);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, slug, status } = body;
  if (!title || !slug)
    return NextResponse.json({ error: 'Title and slug required' }, { status: 400 });
  const page = await prisma.page.create({
    data: { title, slug, status: status ?? 'DRAFT' },
  });
  return NextResponse.json(page, { status: 201 });
}
