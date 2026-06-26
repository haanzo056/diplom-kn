import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const items = await prisma.navigationItem.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.label || !body.href)
    return NextResponse.json({ error: 'Label and href required' }, { status: 400 });

  const siblingsCount = await prisma.navigationItem.count({
    where: { parentId: body.parentId ?? null },
  });

  const item = await prisma.navigationItem.create({
    data: {
      label: body.label,
      href: body.href,
      parentId: body.parentId ?? null,
      order: siblingsCount,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
