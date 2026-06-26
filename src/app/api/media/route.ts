import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const files = await prisma.mediaFile.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(files);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = process.env.UPLOADS_PATH ?? path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const filePath = path.join(uploadsDir, safeName);
  await writeFile(filePath, buffer);

  const media = await prisma.mediaFile.create({
    data: {
      name: file.name,
      url: `/uploads/${safeName}`,
      mimeType: file.type,
      size: file.size,
    },
  });

  return NextResponse.json(media);
}
