import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

const PAGES: { slug: string; title: string }[] = [
  // Вступнику
  { slug: 'admission/rules', title: 'Правила прийому' },
  { slug: 'admission/trajectory', title: 'Академічна траєкторія здобувача освіти' },
  { slug: 'admission/prep-courses', title: 'Підготовчі курси' },

  // Студенту
  { slug: 'student', title: 'Студенту' },
  { slug: 'student/process', title: 'Організація навчального процесу' },
  { slug: 'student/schedule', title: 'Розклад занять' },
  { slug: 'student/syllabi', title: 'Сілабуси навчальних дисциплін' },
  { slug: 'student/rating', title: 'Рейтинг студентів' },
  { slug: 'student/catalog', title: 'Каталог вибіркових дисциплін' },
  { slug: 'student/council', title: 'Рада студентського самоврядування' },
  { slug: 'student/diploma', title: 'Дипломне проектування' },
  { slug: 'student/practice', title: 'Практична підготовка' },

  // Коледж
  { slug: 'college/commissions', title: 'Циклові комісії' },
  { slug: 'college/strategy', title: 'Стратегія розвитку' },
  { slug: 'college/regulations', title: 'Положення про коледж' },
  { slug: 'college/attestation', title: 'Атестацію педагогічних працівників' },
  { slug: 'college/council', title: 'Педагогічна рада' },
  { slug: 'college/memory', title: "Сторінка пам'яті" },
  { slug: 'college/education', title: 'Виховна робота' },

  // Публічна інформація
  { slug: 'public/structure', title: 'Структура та органи управління' },
  { slug: 'public/regulations', title: 'Нормативна база' },
  { slug: 'public/licenses', title: 'Сертифікати та ліцензії' },
  { slug: 'public/tuition', title: 'Розмір плати за навчання' },
  { slug: 'public/vacancies', title: 'Вакантні посади' },
  { slug: 'public/language', title: 'Мова освітнього процесу' },
  { slug: 'public/budget', title: 'Бюджет та фінансовий звіт' },
  { slug: 'public/anti-bullying', title: 'Протидія булінгу' },
];

async function main() {
  for (const page of PAGES) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: {
        title: page.title,
        slug: page.slug,
        status: 'PUBLISHED',
        content: [],
      },
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
