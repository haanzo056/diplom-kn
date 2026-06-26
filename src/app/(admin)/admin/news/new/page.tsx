import { PostConstructor } from '@/feature/admin/posts/constructor/post-constructor';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Нова новина' };

export default async function NewNewsPage() {
  const newsPage = await prisma.page.findFirst({ where: { slug: 'news' }, select: { id: true } });

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 h-[calc(100vh-64px)]">
      <PostConstructor defaultCategory="NEWS" defaultPageId={newsPage?.id} />
    </div>
  );
}
