import { AllNewsPage } from '@/feature/news/allNews';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Новости' };

export default function Page() {
  return <AllNewsPage />;
}
