import { SpecialtyDetailPage } from '@/feature/public/specialties/SpecialtyDetailPage';
import { SPECIALTIES } from '@/feature/public/specialties/data';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const specialty = SPECIALTIES.find((s) => s.slug === slug);
  if (!specialty) return {};
  return { title: specialty.name };
}

export function generateStaticParams() {
  return SPECIALTIES.map((s) => ({ slug: s.slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const specialty = SPECIALTIES.find((s) => s.slug === slug);
  if (!specialty) notFound();

  const posts = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      title: { contains: specialty.code },
    },
    orderBy: { publishedAt: { sort: 'desc', nulls: 'last' } },
    select: { id: true, title: true, slug: true, excerpt: true },
  });

  return <SpecialtyDetailPage specialty={specialty} posts={posts} />;
}
