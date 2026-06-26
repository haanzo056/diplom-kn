import NewsCard from '@/components/ui/cards/NewsCard';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import SideBar from './components/SideBar';

export const CATEGORY_LABELS: Record<string, string> = {
  NEWS: 'Новини',
  ARTICLE: 'Стаття',
  TUTORIAL: 'Навчання',
  REVIEW: 'Огляд',
  OPINION: 'Думка',
  INTERVIEW: "Інтерв'ю",
  ANNOUNCEMENT: 'Оголошення',
  OTHER: 'Інше',
};

const VALID_CATEGORIES = Object.keys(CATEGORY_LABELS);

function formatDate(date: Date | null): string {
  if (!date) return '';
  return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}

interface Props {
  category?: string;
}

export const AllNewsPage = async ({ category }: Props) => {
  const activeCategory = category && VALID_CATEGORIES.includes(category) ? category : undefined;

  const posts = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      ...(activeCategory ? { category: activeCategory as any } : {}),
    },
    orderBy: [{ publishedAt: { sort: 'desc', nulls: 'last' } }, { createdAt: 'desc' }],
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      publishedAt: true,
      image: { select: { url: true } },
    },
  });

  const newsItems = posts.map((post) => ({
    id: post.slug || post.id,
    title: post.title,
    excerpt: post.excerpt ?? '',
    date: formatDate(post.publishedAt),
    category: CATEGORY_LABELS[post.category] ?? post.category,
    image: post.image?.url ?? null,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Новини</h1>
        <p className="text-slate-600 mt-2">Останні події та оголошення коледжу</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        <main className="flex-1 min-w-0">
          {newsItems.length === 0 ? (
            <p className="text-slate-400 text-center py-12">Новини відсутні</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {newsItems.map((news) => (
                <Link href={`/news/${news.id}`} key={news.id} className="block h-full">
                  <NewsCard news={news} className="h-full" />
                </Link>
              ))}
            </div>
          )}
        </main>
        <SideBar activeCategory={activeCategory} />
      </div>
    </div>
  );
};
