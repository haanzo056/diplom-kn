import { PostConstructor } from '@/feature/admin/posts/constructor/PostConstructor';

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ pageId?: string }>;
}) {
  const { pageId } = await searchParams;
  return <PostConstructor defaultPageId={pageId} />;
}
