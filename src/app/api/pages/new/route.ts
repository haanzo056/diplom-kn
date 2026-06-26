import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, slug, status } = await req.json();
    if (!title || !slug) {
      return NextResponse.json({ message: 'Title and slug are required' }, { status: 400 });
    }
    const existingPage = await prisma.page.findUnique({ where: { slug } });
    if (existingPage) {
      return NextResponse.json({ message: 'Slug already exists' }, { status: 400 });
    }
    const page = await prisma.page.create({
      data: {
        title,
        slug,
        status: status ?? 'DRAFT',
      },
    });
    return NextResponse.json({ message: 'Page created successfully', page }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating page' }, { status: 500 });
  }
}
