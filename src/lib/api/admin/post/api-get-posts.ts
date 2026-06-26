import { axiosInstance } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type PostCategory =
  | 'NEWS' | 'ARTICLE' | 'TUTORIAL' | 'REVIEW'
  | 'OPINION' | 'INTERVIEW' | 'ANNOUNCEMENT' | 'OTHER';

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type PostBlock = {
  type: string;
  value: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  status: PostStatus;
  category: PostCategory;
  publishedAt: string | null;
};

export type PostDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  status: PostStatus;
  category: PostCategory;
  pageId?: string;
  blocks: PostBlock[];
  publishedAt: string | null;
};

export type CreatePostInput = {
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  status: PostStatus;
  category?: PostCategory;
  pageId?: string | null;
  blocks: PostBlock[];
};

export type UpdatePostInput = CreatePostInput & { id: string };

const getPosts = async (pageId?: string): Promise<Post[]> => {
  const response = await axiosInstance.get<Post[]>('/posts', { params: pageId ? { pageId } : undefined });
  return response.data;
};

export const useGetPosts = (pageId?: string) =>
  useQuery({
    queryKey: ['posts', pageId ?? 'all'],
    queryFn: () => getPosts(pageId),
  });

const getPostById = async (id: string): Promise<PostDetail> => {
  const response = await axiosInstance.get<PostDetail>(`/posts/${id}`);
  return response.data;
};

export const useGetPostById = (id: string) =>
  useQuery({
    queryKey: ['posts', 'detail', id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

const createPost = async (data: CreatePostInput): Promise<PostDetail> => {
  const response = await axiosInstance.post<PostDetail>('/posts', data);
  return response.data;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
};

const updatePost = async ({ id, ...data }: UpdatePostInput): Promise<PostDetail> => {
  const response = await axiosInstance.patch<PostDetail>(`/posts/${id}`, data);
  return response.data;
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
};

const getPostBySlug = async (slug: string): Promise<PostDetail> => {
  const response = await axiosInstance.get<PostDetail>(`/posts/slug/${slug}`);
  return response.data;
};

export const useGetPostBySlug = (slug: string) =>
  useQuery({
    queryKey: ['posts', 'slug', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
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
