import { axiosInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export type CreatePageRequest = {
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
};

export type CreatePageResponse = {
  status: string;
  message: string;
};

const createPage = async ({
  title,
  slug,
  status,
}: CreatePageRequest): Promise<CreatePageResponse> => {
  const response = await axiosInstance.post<CreatePageResponse>('/pages/new', {
    title,
    slug,
    status,
  });
  return response.data;
};

export const useCreatePage = () =>
  useMutation({
    mutationFn: ({ title, slug, status }: CreatePageRequest) => createPage({ title, slug, status }),
  });
