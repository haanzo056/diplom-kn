'use client';

import { useGetPages } from '@/lib/api/admin/pages/api-pages';
import Link from 'next/link';

const STATUS_LABEL = { DRAFT: 'Черновик', PUBLISHED: 'Опубликована' } as const;
const STATUS_CLASS = {
  DRAFT: 'bg-slate-100 text-slate-500',
  PUBLISHED: 'bg-green-100 text-green-700',
} as const;

export const PagesList = () => {
  const { data: pages, isLoading, isError } = useGetPages();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Страницы</h1>
        <Link
          href="/admin/pages/new"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Новая страница
        </Link>
      </div>

      <div className="bg-white rounded-lg border divide-y">
        {isLoading && <p className="p-4 text-gray-400 text-sm">Загрузка...</p>}
        {isError && <p className="p-4 text-red-400 text-sm">Ошибка загрузки.</p>}
        {!isLoading && !isError && pages?.length === 0 && (
          <p className="p-4 text-gray-400 text-sm">Страниц нет.</p>
        )}
        {pages?.map((page) => (
          <div
            key={page.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{page.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">/{page.slug}</p>
            </div>
            <div className="flex items-center gap-3 ml-4 shrink-0">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_CLASS[page.status]}`}
              >
                {STATUS_LABEL[page.status]}
              </span>
              <Link
                href={`/admin/pages/${page.id}`}
                className="text-xs text-blue-500 hover:underline"
              >
                Редактировать
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
