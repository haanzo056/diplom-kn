import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type ReorderEntry = { id: string; order: number; parentId: string | null };

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items: ReorderEntry[] = Array.isArray(body.items) ? body.items : [];

  await prisma.$transaction(
    items.map((item) =>
      prisma.navigationItem.update({
        where: { id: item.id },
        data: { order: item.order, parentId: item.parentId },
      }),
    ),
  );

  return NextResponse.json({ success: true });
}
