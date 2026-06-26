import { prisma } from '@/lib/prisma';
import { ArrowRight, FileText, Image as ImageIcon, Newspaper } from 'lucide-react';
import Link from 'next/link';

const STATUS_LABEL = { DRAFT: 'Чернетка', PUBLISHED: 'Опубліковано' } as const;
const STATUS_CLASS = {
  DRAFT: 'bg-slate-100 text-slate-500',
  PUBLISHED: 'bg-green-100 text-green-700',
} as const;

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('uk-UA', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export const Dashboard = async () => {
  const [
    pagesTotal,
    pagesPublished,
    postsTotal,
    postsPublished,
    mediaTotal,
    recentPages,
    recentPosts,
  ] = await Promise.all([
    prisma.page.count(),
    prisma.page.count({ where: { status: 'PUBLISHED' } }),
    prisma.post.count(),
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
    prisma.mediaFile.count(),
    prisma.page.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, status: true, updatedAt: true },
    }),
    prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, status: true, updatedAt: true },
    }),
  ]);

  const cards = [
    {
      label: 'Сторінки',
      href: '/admin/pages',
      icon: FileText,
      total: pagesTotal,
      caption: `${pagesPublished} опубліковано`,
    },
    {
      label: 'Пости',
      href: '/admin/posts',
      icon: Newspaper,
      total: postsTotal,
      caption: `${postsPublished} опубліковано`,
    },
    {
      label: 'Медіатека',
      href: '/admin/media',
      icon: ImageIcon,
      total: mediaTotal,
      caption: 'файлів завантажено',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Дашборд</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-lg border p-5 hover:shadow-sm transition-shadow flex items-start justify-between gap-3"
          >
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{card.total}</p>
              <p className="text-xs text-gray-400 mt-1">{card.caption}</p>
            </div>
            <card.icon className="w-5 h-5 text-gray-300 shrink-0" />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-lg border p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Останні сторінки</h2>
            <Link
              href="/admin/pages"
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
            >
              Усі сторінки
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPages.length === 0 && (
              <p className="text-sm text-gray-400 py-3">Сторінок ще немає</p>
            )}
            {recentPages.map((page) => (
              <Link
                key={page.id}
                href={`/admin/pages/${page.id}`}
                className="flex items-center justify-between gap-3 py-2.5 hover:bg-gray-50 -mx-2 px-2 rounded-md transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{page.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(page.updatedAt)}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_CLASS[page.status]}`}
                >
                  {STATUS_LABEL[page.status]}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Останні пости</h2>
            <Link
              href="/admin/posts"
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
            >
              Усі пости
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPosts.length === 0 && (
              <p className="text-sm text-gray-400 py-3">Постів ще немає</p>
            )}
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}`}
                className="flex items-center justify-between gap-3 py-2.5 hover:bg-gray-50 -mx-2 px-2 rounded-md transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(post.updatedAt)}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_CLASS[post.status]}`}
                >
                  {STATUS_LABEL[post.status]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
