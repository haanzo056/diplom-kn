import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

const MENU: { title: string; href: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Вступнику',
    href: '/admission',
    links: [
      { label: 'Правила прийому', href: '/admission/rules' },
      { label: 'Академічна траєкторія здобувача освіти', href: '/admission/trajectory' },
      { label: 'Підготовчі курси', href: '/admission/prep-courses' },
    ],
  },
  {
    title: 'For Foreigners',
    href: '/foreigners',
    links: [
      { label: 'About us', href: '/foreigners/about' },
      { label: 'Contact information', href: '/foreigners/contacts' },
      { label: 'Admission rules', href: '/foreigners/admission' },
      { label: 'Faculties and specialties', href: '/foreigners/faculties' },
    ],
  },
  {
    title: 'Коледж',
    href: '/college',
    links: [
      { label: 'Новини', href: '/news' },
      { label: 'Керівництво', href: '/management' },
      { label: 'Циклові комісії', href: '/college/commissions' },
      { label: 'Стратегія розвитку', href: '/college/strategy' },
      { label: 'Положення про коледж', href: '/college/regulations' },
      { label: 'Атестацію педагогічних працівників', href: '/college/attestation' },
      { label: 'Педагогічна рада', href: '/college/council' },
      { label: "Сторінка пам'яті", href: '/college/memory' },
      { label: 'Виховна робота', href: '/college/education' },
    ],
  },
  {
    title: 'Студенту',
    href: '/student',
    links: [
      { label: 'Організація навчального процесу', href: '/student/process' },
      { label: 'Розклад занять', href: '/student/schedule' },
      { label: 'Сілабуси навчальних дисциплін', href: '/student/syllabi' },
      { label: 'Рейтинг студентів', href: '/student/rating' },
      { label: 'Каталог вибіркових дисциплін', href: '/student/catalog' },
      { label: 'Рада студентського самоврядування', href: '/student/council' },
      { label: 'Дипломне проектування', href: '/student/diploma' },
      { label: 'Практична підготовка', href: '/student/practice' },
    ],
  },
  {
    title: 'Публічна інформація',
    href: '/public',
    links: [
      { label: 'Структура та органи управління', href: '/public/structure' },
      { label: 'Нормативна база', href: '/public/regulations' },
      { label: 'Сертифікати та ліцензії', href: '/public/licenses' },
      { label: 'Розмір плати за навчання', href: '/public/tuition' },
      { label: 'Вакантні посади', href: '/public/vacancies' },
      { label: 'Мова освітнього процесу', href: '/public/language' },
      { label: 'Бюджет та фінансовий звіт', href: '/public/budget' },
      { label: 'Протидія булінгу', href: '/public/anti-bullying' },
    ],
  },
];

async function main() {
  const existing = await prisma.navigationItem.count();
  if (existing > 0) {
    console.log(`Navigation already has ${existing} items — skipping seed.`);
    return;
  }

  for (let i = 0; i < MENU.length; i++) {
    const group = MENU[i];
    const created = await prisma.navigationItem.create({
      data: { label: group.title, href: group.href, order: i, parentId: null },
    });
    console.log(`✓ ${group.title}`);

    for (let j = 0; j < group.links.length; j++) {
      const link = group.links[j];
      await prisma.navigationItem.create({
        data: { label: link.label, href: link.href, order: j, parentId: created.id },
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
