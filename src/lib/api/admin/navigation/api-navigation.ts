import { NavigationItem } from '@/generated/prisma/client';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const NAVIGATION_KEY = ['navigation'];

export type GetNavigationResponse = NavigationItem;

const getNavigation = async (): Promise<GetNavigationResponse[]> => {
  const response = await axiosInstance.get<GetNavigationResponse[]>('/navigation');
  return response.data;
};

export const useGetNavigation = () =>
  useQuery({
    queryKey: NAVIGATION_KEY,
    queryFn: getNavigation,
  });

export type CreateNavigationItemInput = { label: string; href: string; parentId?: string | null };

const createNavigationItem = async (data: CreateNavigationItemInput): Promise<NavigationItem> => {
  const response = await axiosInstance.post<NavigationItem>('/navigation', data);
  return response.data;
};

export const useCreateNavigationItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNavigationItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NAVIGATION_KEY }),
  });
};

export type UpdateNavigationItemInput = {
  id: string;
  label?: string;
  href?: string;
  parentId?: string | null;
};

const updateNavigationItem = async ({ id, ...data }: UpdateNavigationItemInput): Promise<NavigationItem> => {
  const response = await axiosInstance.patch<NavigationItem>(`/navigation/${id}`, data);
  return response.data;
};

export const useUpdateNavigationItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNavigationItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NAVIGATION_KEY }),
  });
};

const deleteNavigationItem = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/navigation/${id}`);
};

export const useDeleteNavigationItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNavigationItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NAVIGATION_KEY }),
  });
};

export type ReorderEntry = { id: string; order: number; parentId: string | null };

const reorderNavigation = async (items: ReorderEntry[]): Promise<void> => {
  await axiosInstance.post('/navigation/reorder', { items });
};

export const useReorderNavigation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reorderNavigation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NAVIGATION_KEY }),
  });
};
