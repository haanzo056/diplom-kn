import { NewsList } from '@/feature/admin/news/NewsList';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Новини' };

export default function NewsPage() {
  return <NewsList />;
}
