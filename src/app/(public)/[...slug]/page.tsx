import { getContent } from '@/feature/public/slug/queries';
import { SlugPage } from '@/feature/public/slug/SlugPage';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = slug.join('/');
  const page = await getContent(fullSlug);
  return { title: page?.data.title ?? fullSlug };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  return <SlugPage slug={slug.join('/')} />;
}
