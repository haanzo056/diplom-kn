'use client';
import { useCreatePage } from '@/lib/api/admin/pages/createNewPage/api-create-page';
import { queryClient } from '@/lib/queryClient';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useCreateNewPage = () => {
  const { mutateAsync: createPage, isPending } = useCreatePage();
  const router = useRouter();
  const handleCreatePage = async (title: string, slug: string, published: boolean) => {
    try {
      await createPage({
        title,
        slug,
        status: published ? 'PUBLISHED' : 'DRAFT',
      });
      await queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success('Сторінку створено');
      router.push('/admin/pages');
    } catch (error) {
      toast.error('Не вдалося створити сторінку');
    }
  };
  return { handleCreatePage, isPending };
};
