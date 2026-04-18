'use client';

import { Button } from '@/components/ui/button';
import NewsCard from '@/components/ui/cards/NewsCard';
import { MOCK_NEWS } from '@/consts/MOCK_NEWS';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import SideBar from './components/SideBar';

export const AllNewsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{t('news.title')}</h1>
          <p className="text-slate-600 mt-2">{t('news.subtitle')}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        <main className="flex-1 min-w-0">
          <div className="grid grid-cols-1 gap-6">
            {MOCK_NEWS.map((news) => (
              <Link href={`/news/${news.id}`} key={news.id} className="block">
                <NewsCard news={news} />
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="secondary" className="w-full sm:w-auto">
              {t('news.loadMore')}
            </Button>
          </div>
        </main>
        <SideBar />
      </div>
    </div>
  );
};
