import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);
const WP_URL = 'https://college.suitt.edu.ua';
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const PER_PAGE = 100;

async function fetchPage(page: number) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/media?per_page=${PER_PAGE}&page=${page}`);
  if (!res.ok) return [];
  return res.json() as Promise<any[]>;
}

async function downloadFile(url: string, filename: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(path.join(UPLOADS_DIR, filename), buffer);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(UPLOADS_DIR, { recursive: true });

  let page = 1;
  let total = 0;
  let skipped = 0;
  let failed = 0;

  console.log(`\n🚀 Starting migration from ${WP_URL}\n`);

  while (true) {
    const items = await fetchPage(page);
    if (!items || items.length === 0) break;

    for (const item of items) {
      const sourceUrl: string = item.source_url;
      if (!sourceUrl) { skipped++; continue; }

      const originalName = path.basename(sourceUrl);
      const safeName = `${item.id}-${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const mimeType: string = item.mime_type ?? 'application/octet-stream';

      // Skip if already migrated
      const existing = await prisma.mediaFile.findFirst({ where: { url: `/uploads/${safeName}` } });
      if (existing) {
        console.log(`  ⏭  [${item.id}] already exists, skipping`);
        skipped++;
        continue;
      }

      process.stdout.write(`  ⬇  [${item.id}] ${originalName} ... `);
      const ok = await downloadFile(sourceUrl, safeName);

      if (!ok) {
        console.log('FAILED');
        failed++;
        continue;
      }

      await prisma.mediaFile.create({
        data: {
          name: item.title?.rendered || originalName,
          url: `/uploads/${safeName}`,
          mimeType,
          size: 0,
        },
      });

      console.log('OK');
      total++;
    }

    if (items.length < PER_PAGE) break;
    page++;
  }

  console.log(`\n✅ Done! Migrated: ${total} | Skipped: ${skipped} | Failed: ${failed}\n`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
