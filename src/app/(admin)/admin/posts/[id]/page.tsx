import { PostConstructor } from '@/feature/admin/posts/constructor/PostConstructor';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PostConstructor id={id} />;
}
