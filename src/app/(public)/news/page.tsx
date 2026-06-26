import { AllNewsPage } from '@/feature/news/allNews';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Новини' };

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const { category } = await searchParams;
  return <AllNewsPage category={category} />;
}
