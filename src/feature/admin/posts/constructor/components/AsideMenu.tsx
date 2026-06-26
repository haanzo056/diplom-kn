'use client';

import { PostCategory } from '@/lib/api/admin/post/api-get-posts';
import { Page } from '@/generated/prisma/client';
import { FileText, ImageIcon, LayoutTemplate, Plus, Tag } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { PostComponent } from '../const';
import { PostFormValues } from '../hooks/useConstructorLogic';

const CATEGORY_LABELS: Record<PostCategory, string> = {
  NEWS: 'Новини',
  ARTICLE: 'Стаття',
  TUTORIAL: 'Туторіал',
  REVIEW: 'Огляд',
  OPINION: 'Думка',
  INTERVIEW: "Інтерв'ю",
  ANNOUNCEMENT: 'Анонс',
  OTHER: 'Інше',
};

interface AsideMenuProps {
  onAdd: (component: PostComponent) => void;
  availableComponents: PostComponent[];
  pages: Page[];
  selectedPageId: string | null;
  onPageChange: (pageId: string | null) => void;
  form: UseFormReturn<PostFormValues>;
}

const selectClass =
  'w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

const AsideMenu = ({
  onAdd,
  availableComponents,
  pages,
  selectedPageId,
  onPageChange,
  form,
}: AsideMenuProps) => {
  const { register } = form;

  return (
    <aside className="w-full sm:w-64 bg-white border border-slate-200 rounded-xl p-4 shadow-sm sticky top-6 flex flex-col gap-4 self-start">
      <div>
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
          Додати блок
        </h2>
        <ul className="space-y-1">
          {availableComponents.map((component) => (
            <li key={component.key}>
              <button
                onClick={() => onAdd(component)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all group"
              >
                <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                  {component.icon}
                </div>
                <span className="flex-1 text-left">{component.label}</span>
                <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-100 pt-4 space-y-4">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">
          Публікація
        </h2>

        {/* Status */}
        <div className="px-1 space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 px-1">
            Статус
          </label>
          <select {...register('status')} className={selectClass}>
            <option value="DRAFT">Чернетка</option>
            <option value="PUBLISHED">Опубліковано</option>
            <option value="ARCHIVED">Архів</option>
          </select>
        </div>

        {/* Category */}
        <div className="px-1 space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 px-1">
            <Tag className="w-3.5 h-3.5" />
            Категорія
          </label>
          <select {...register('category')} className={selectClass}>
            {(Object.keys(CATEGORY_LABELS) as PostCategory[]).map((key) => (
              <option key={key} value={key}>
                {CATEGORY_LABELS[key]}
              </option>
            ))}
          </select>
        </div>

        {/* Cover image */}
        <div className="px-1 space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 px-1">
            <ImageIcon className="w-3.5 h-3.5" />
            Обкладинка (URL)
          </label>
          <input
            {...register('image')}
            placeholder="https://..."
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Excerpt */}
        <div className="px-1 space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 px-1">
            Короткий опис
          </label>
          <textarea
            {...register('excerpt')}
            rows={3}
            placeholder="Кілька слів про допис..."
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Page */}
        <div className="px-1 space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 px-1">
            <LayoutTemplate className="w-3.5 h-3.5" />
            Сторінка
          </label>
          {pages.length === 0 ? (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <FileText className="w-4 h-4 text-slate-300 shrink-0" />
              <span className="text-xs text-slate-400">Сторінок немає</span>
            </div>
          ) : (
            <select
              value={selectedPageId ?? ''}
              onChange={(e) => onPageChange(e.target.value || null)}
              className={selectClass}
            >
              <option value="">Без сторінки</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.title}
                </option>
              ))}
            </select>
          )}
          {selectedPageId && (
            <p className="text-xs text-blue-500 px-1">
              /{pages.find((p) => p.id === selectedPageId)?.slug}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AsideMenu;
