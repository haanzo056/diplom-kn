import { axiosInstance } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type Post = {
  id: string;
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  category: string;
  publishedAt: string | null;
};

const getPosts = async (pageId: string): Promise<Post[]> => {
  const response = await axiosInstance.get<Post[]>('/posts', { params: { pageId } });
  return response.data;
};

export const useGetPosts = (pageId: string) =>
  useQuery({
    queryKey: ['posts', pageId],
    queryFn: () => getPosts(pageId),
    enabled: !!pageId,
  });

const deletePost = async (id: string): Promise<void> => {
  await axiosInstance.delete('/posts', { data: { id } });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
};
