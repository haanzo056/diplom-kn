import NewsPostPage from '@/feature/news/newsPost';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <NewsPostPage slug={slug} />;
}
