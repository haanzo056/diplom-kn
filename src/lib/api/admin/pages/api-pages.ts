import { Page } from '@/generated/prisma/client';
import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

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
