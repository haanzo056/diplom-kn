import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

const PAGES: { slug: string; title: string }[] = [
  { slug: 'specialties', title: 'Спеціальності' },
  { slug: 'specialties/f2', title: 'Інженерія програмного забезпечення' },
  { slug: 'specialties/f3', title: "Комп'ютерні науки" },
  { slug: 'specialties/g5', title: 'Електроніка та радіотехніка' },
];

async function main() {
  for (const page of PAGES) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: { title: page.title, slug: page.slug, status: 'PUBLISHED', content: [] },
    });
    console.log(`✓ ${page.slug} — ${page.title}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
