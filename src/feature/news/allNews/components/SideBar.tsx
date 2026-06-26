'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES: { value: string; label: string }[] = [
  { value: 'NEWS', label: 'Новини' },
  { value: 'ARTICLE', label: 'Стаття' },
  { value: 'TUTORIAL', label: 'Навчання' },
  { value: 'REVIEW', label: 'Огляд' },
  { value: 'OPINION', label: 'Думка' },
  { value: 'INTERVIEW', label: "Інтерв'ю" },
  { value: 'ANNOUNCEMENT', label: 'Оголошення' },
  { value: 'OTHER', label: 'Інше' },
];

interface Props {
  activeCategory?: string;
}

const SideBar = ({ activeCategory }: Props) => {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-[#f4f5f7] p-8 rounded-xl lg:sticky lg:top-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Категорії</h2>
        <div className="w-12 h-1 bg-blue-600 mb-6" />

        <ul className="space-y-4">
          <li>
            <Link
              href="/news"
              className="flex items-center gap-3 group"
            >
              <ChevronRight className="w-5 h-5 text-blue-600 shrink-0" />
              <span className={`text-[17px] font-medium transition-colors group-hover:text-blue-600 group-hover:underline ${!activeCategory ? 'text-blue-600 underline decoration-blue-600 decoration-2 underline-offset-4' : 'text-slate-800'}`}>
                Всі новини
              </span>
            </Link>
          </li>
          {CATEGORIES.map(({ value, label }) => {
            const isActive = activeCategory === value;
            return (
              <li key={value}>
                <Link
                  href={`/news?category=${value}`}
                  className="flex items-center gap-3 group"
                >
                  <ChevronRight className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className={`text-[17px] font-medium transition-colors group-hover:text-blue-600 group-hover:underline ${isActive ? 'text-blue-600 underline decoration-blue-600 decoration-2 underline-offset-4' : 'text-slate-800'}`}>
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
