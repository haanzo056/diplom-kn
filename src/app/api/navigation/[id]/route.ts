import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const item = await prisma.navigationItem.update({
    where: { id },
    data: {
      ...(body.label !== undefined && { label: body.label }),
      ...(body.href !== undefined && { href: body.href }),
      ...(body.parentId !== undefined && { parentId: body.parentId }),
      ...(body.order !== undefined && { order: body.order }),
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.navigationItem.deleteMany({ where: { OR: [{ id }, { parentId: id }] } });
  return NextResponse.json({ success: true });
}
