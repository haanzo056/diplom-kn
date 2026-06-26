import { Page } from '@/generated/prisma/client';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type GetPagesResponse = Page;

const getPages = async (): Promise<GetPagesResponse[]> => {
  const response = await axiosInstance.get<GetPagesResponse[]>('/pages');
  return response.data;
};

export const useGetPages = () =>
  useQuery({
    queryKey: ['pages'],
    queryFn: getPages,
  });

export type GetPageResponse = Page;

const getPage = async (id: string): Promise<GetPageResponse> => {
  const response = await axiosInstance.get<GetPageResponse>(`/pages/${id}`);
  return response.data;
};

export const useGetPage = (id: string) =>
  useQuery({
    queryKey: ['pages', id],
    queryFn: () => getPage(id),
    enabled: !!id,
  });

export type GetPageBySlugResponse = Page;

const getPageBySlug = async (slug: string): Promise<GetPageBySlugResponse> => {
  const response = await axiosInstance.get<GetPageBySlugResponse>(`/pages/slug/${slug}`);
  return response.data;
};

export const useGetPageBySlug = (slug: string) =>
  useQuery({
    queryKey: ['pages', 'slug', slug],
    queryFn: () => getPageBySlug(slug),
    enabled: !!slug,
  });

export type PageBlock = { type: string; value: string };
export type UpdatePageInput = { id: string; title: string; slug: string; status: string; content?: PageBlock[] };

const updatePage = async ({ id, ...data }: UpdatePageInput): Promise<Page> => {
  const response = await axiosInstance.patch<Page>(`/pages/${id}`, data);
  return response.data;
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pages'] }),
  });
};
