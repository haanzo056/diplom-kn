import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Pages
  const newsPage = await prisma.page.upsert({
    where: { slug: 'news' },
    update: {},
    create: {
      title: 'Новости',
      slug: 'news',
      status: 'PUBLISHED',
      content: [],
    },
  });

  const articlesPage = await prisma.page.upsert({
    where: { slug: 'articles' },
    update: {},
    create: {
      title: 'Статьи',
      slug: 'articles',
      status: 'PUBLISHED',
      content: [],
    },
  });

  const announcementsPage = await prisma.page.upsert({
    where: { slug: 'announcements' },
    update: {},
    create: {
      title: 'Объявления',
      slug: 'announcements',
      status: 'PUBLISHED',
      content: [],
    },
  });

  // News posts
  const newsPosts = [
    {
      title: 'Открытие нового корпуса университета',
      slug: 'otkrytie-novogo-korpusa',
      excerpt: 'В этом году университет открывает новый учебный корпус на 500 мест.',
      status: 'PUBLISHED' as const,
      category: 'NEWS' as const,
      pageId: newsPage.id,
      publishedAt: new Date('2026-04-10'),
      blocks: [
        { type: 'heading', value: 'Торжественное открытие' },
        {
          type: 'text',
          value:
            'В пятницу, 10 апреля 2026 года, состоялась торжественная церемония открытия нового учебного корпуса университета. На мероприятии присутствовали представители ректората, преподаватели и студенты.',
        },
        {
          type: 'quote',
          value: 'Этот корпус — наш вклад в будущее образования страны. — Ректор университета',
        },
        {
          type: 'text',
          value:
            'Новый корпус оснащён современными лабораториями, аудиториями и зонами для самостоятельной работы студентов.',
        },
      ],
    },
    {
      title: 'Университет вошёл в топ-100 рейтинга QS',
      slug: 'top-100-qs-rating',
      excerpt:
        'Наш университет впервые попал в международный рейтинг QS World University Rankings.',
      status: 'PUBLISHED' as const,
      category: 'NEWS' as const,
      pageId: newsPage.id,
      publishedAt: new Date('2026-04-05'),
      blocks: [
        { type: 'heading', value: 'Международное признание' },
        {
          type: 'text',
          value:
            'По итогам 2026 года наш университет впервые вошёл в топ-100 мирового рейтинга QS, заняв 94-ю позицию. Это результат многолетней работы всего коллектива.',
        },
        { type: 'divider', value: '' },
        {
          type: 'text',
          value:
            'Особую роль в достижении этого результата сыграли научные публикации и международные партнёрства.',
        },
      ],
    },
    {
      title: 'Стипендиальная программа для студентов 2026',
      slug: 'stipendialnaya-programma-2026',
      excerpt: 'Объявлен набор на расширенную стипендиальную программу.',
      status: 'PUBLISHED' as const,
      category: 'ANNOUNCEMENT' as const,
      pageId: newsPage.id,
      publishedAt: new Date('2026-04-01'),
      blocks: [
        { type: 'heading', value: 'Новые стипендии' },
        {
          type: 'warning',
          value: 'Заявки принимаются до 30 апреля 2026 года. Опоздавшие заявки не рассматриваются.',
        },
        {
          type: 'text',
          value:
            'В этом году фонд стипендиальной программы увеличен вдвое. К участию приглашаются студенты 2–4 курсов с успеваемостью не ниже 4.0.',
        },
        {
          type: 'list',
          value:
            'Средний балл не ниже 4.0\nУчастие в научной деятельности\nРекомендательное письмо',
        },
      ],
    },
  ];

  for (const post of newsPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { pageId: post.pageId },
      create: post,
    });
  }

  // Article posts
  const articlePosts = [
    {
      title: 'Как эффективно готовиться к сессии',
      slug: 'kak-gotovitsya-k-sessii',
      excerpt: 'Советы и стратегии для успешной подготовки к экзаменам.',
      status: 'PUBLISHED' as const,
      category: 'ARTICLE' as const,
      pageId: articlesPage.id,
      publishedAt: new Date('2026-03-20'),
      blocks: [
        { type: 'heading', value: 'Планирование — основа успеха' },
        {
          type: 'text',
          value:
            'Подготовка к экзаменам начинается задолго до самой сессии. Ключевой элемент — составление чёткого расписания с равномерным распределением нагрузки.',
        },
        { type: 'heading', value: 'Техники запоминания' },
        {
          type: 'text',
          value:
            'Метод интервального повторения доказал свою эффективность. Используйте карточки или приложения типа Anki для отработки теоретического материала.',
        },
        {
          type: 'quote',
          value: 'Повторение — мать учения, но интервальное повторение — отец знания.',
        },
      ],
    },
    {
      title: 'Введение в машинное обучение',
      slug: 'vvedenie-v-mashinnoe-obuchenie',
      excerpt: 'Обзор основных концепций и инструментов машинного обучения для начинающих.',
      status: 'PUBLISHED' as const,
      category: 'TUTORIAL' as const,
      pageId: articlesPage.id,
      publishedAt: new Date('2026-03-15'),
      blocks: [
        { type: 'heading', value: 'Что такое машинное обучение?' },
        {
          type: 'text',
          value:
            'Машинное обучение — раздел искусственного интеллекта, где алгоритмы учатся на данных без явного программирования. Различают обучение с учителем, без учителя и с подкреплением.',
        },
        { type: 'heading', value: 'Пример на Python' },
        {
          type: 'code',
          value:
            'from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)',
        },
        {
          type: 'text',
          value:
            'Для старта рекомендуем библиотеки: scikit-learn, pandas, matplotlib. Они покрывают большинство учебных задач.',
        },
      ],
    },
  ];

  for (const post of articlePosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { pageId: post.pageId },
      create: post,
    });
  }

  // Announcement posts
  const announcementPosts = [
    {
      title: 'Расписание на весенний семестр 2026',
      slug: 'raspisanie-vesna-2026',
      excerpt: 'Опубликовано расписание занятий на весенний семестр.',
      status: 'PUBLISHED' as const,
      category: 'ANNOUNCEMENT' as const,
      pageId: announcementsPage.id,
      publishedAt: new Date('2026-02-01'),
      blocks: [
        { type: 'heading', value: 'Весенний семестр 2026' },
        {
          type: 'text',
          value:
            'Расписание занятий на весенний семестр 2026 года опубликовано на сайте деканата. Занятия начинаются 9 февраля 2026 года.',
        },
        {
          type: 'warning',
          value:
            'Обратите внимание: расписание может быть скорректировано в первые две недели семестра.',
        },
      ],
    },
    {
      title: 'Конференция молодых учёных — приём заявок',
      slug: 'konferenciya-molodyh-uchyonyh-2026',
      excerpt: 'Открыт приём заявок на ежегодную конференцию молодых учёных.',
      status: 'PUBLISHED' as const,
      category: 'ANNOUNCEMENT' as const,
      pageId: announcementsPage.id,
      publishedAt: new Date('2026-04-15'),
      blocks: [
        { type: 'heading', value: 'Конференция молодых учёных 2026' },
        {
          type: 'text',
          value:
            'Приглашаем студентов и аспирантов принять участие в ежегодной конференции молодых учёных. Мероприятие пройдёт 20 мая 2026 года.',
        },
        {
          type: 'list',
          value:
            'Секция информационных технологий\nСекция естественных наук\nСекция гуманитарных наук',
        },
        {
          type: 'warning',
          value: 'Заявки принимаются до 5 мая 2026 года на email: conference@university.edu',
        },
      ],
    },
  ];

  for (const post of announcementPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { pageId: post.pageId },
      create: post,
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
