'use client';

import { useGetPages } from '@/lib/api/admin/pages/api-pages';
import { Page } from '@/generated/prisma/client';
import Link from 'next/link';

const STATUS_LABEL = { DRAFT: 'Чернетка', PUBLISHED: 'Опубліковано' } as const;
const STATUS_CLASS = {
  DRAFT: 'bg-slate-100 text-slate-500',
  PUBLISHED: 'bg-green-100 text-green-700',
} as const;

const GROUP_LABELS: Record<string, string> = {
  admission: 'Вступнику',
  student: 'Студенту',
  college: 'Коледж',
  public: 'Публічна інформація',
  foreigners: 'Іноземним студентам',
  other: 'Інше',
};

const GROUP_ORDER = ['admission', 'student', 'college', 'public', 'foreigners', 'other'];

function groupKey(slug: string): string {
  const prefix = slug.split('/')[0];
  return prefix in GROUP_LABELS ? prefix : 'other';
}

function groupPages(pages: Page[]): { key: string; label: string; pages: Page[] }[] {
  const groups = new Map<string, Page[]>();
  for (const page of pages) {
    const key = groupKey(page.slug);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(page);
  }

  return GROUP_ORDER.filter((key) => groups.has(key)).map((key) => ({
    key,
    label: GROUP_LABELS[key],
    pages: groups.get(key)!,
  }));
}

const PageRow = ({ page }: { page: Page }) => (
  <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
    <div className="min-w-0">
      <p className="text-sm font-medium text-slate-800 truncate">{page.title}</p>
      <p className="text-xs text-slate-400 mt-0.5">/{page.slug}</p>
    </div>
    <div className="flex items-center gap-3 ml-4 shrink-0">
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_CLASS[page.status]}`}>
        {STATUS_LABEL[page.status]}
      </span>
      <Link href={`/admin/pages/${page.id}`} className="text-xs text-blue-500 hover:underline">
        Редагувати
      </Link>
    </div>
  </div>
);

export const PagesList = () => {
  const { data: pages, isLoading, isError } = useGetPages();
  const groups = pages ? groupPages(pages) : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Сторінки</h1>
        <Link
          href="/admin/pages/new"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Нова сторінка
        </Link>
      </div>

      {isLoading && (
        <div className="bg-white rounded-lg border p-4 text-gray-400 text-sm">Завантаження...</div>
      )}
      {isError && (
        <div className="bg-white rounded-lg border p-4 text-red-400 text-sm">
          Помилка завантаження.
        </div>
      )}
      {!isLoading && !isError && pages?.length === 0 && (
        <div className="bg-white rounded-lg border p-4 text-gray-400 text-sm">Сторінок немає.</div>
      )}

      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <section key={group.key}>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-sm font-semibold text-slate-600">{group.label}</h2>
              <span className="text-xs text-slate-400">{group.pages.length}</span>
            </div>
            <div className="bg-white rounded-lg border divide-y">
              {group.pages.map((page) => (
                <PageRow key={page.id} page={page} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
