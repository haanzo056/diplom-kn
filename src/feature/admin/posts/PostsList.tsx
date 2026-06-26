'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGetPages } from '@/lib/api/admin/pages/api-pages';
import { Post, useDeletePost, useGetPosts } from '@/lib/api/admin/post/api-get-posts';
import Link from 'next/link';
import { useState } from 'react';

const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Чернетка',
  PUBLISHED: 'Опубліковано',
};

const STATUS_CLASS: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-500',
  PUBLISHED: 'bg-green-100 text-green-700',
};

const STATUS_FILTERS = ['ALL', 'DRAFT', 'PUBLISHED'] as const;
const STATUS_FILTER_LABEL: Record<(typeof STATUS_FILTERS)[number], string> = {
  ALL: 'Усі статуси',
  DRAFT: 'Чернетки',
  PUBLISHED: 'Опубліковані',
};

export const PostsList = () => {
  const [selectedPageId, setSelectedPageId] = useState('');
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>('ALL');
  const [search, setSearch] = useState('');
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const { data: pages, isLoading: pagesLoading } = useGetPages();
  const { data: posts, isLoading: postsLoading, isError } = useGetPosts(selectedPageId || undefined);
  const { mutate: deletePost, isPending } = useDeletePost();

  const filteredPosts = (posts ?? []).filter((post) => {
    if (statusFilter !== 'ALL' && post.status !== statusFilter) return false;
    if (search.trim() && !post.title.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  const handleConfirmDelete = () => {
    if (!postToDelete) return;
    deletePost(postToDelete.id, { onSuccess: () => setPostToDelete(null) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Пости</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Новий пост
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">Пошук</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук за назвою..."
            className="w-full border rounded px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="min-w-[220px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">Сторінка</label>
          <select
            value={selectedPageId}
            onChange={(e) => setSelectedPageId(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Усі сторінки</option>
            {pagesLoading && <option disabled>Завантаження...</option>}
            {pages?.map((page) => (
              <option key={page.id} value={page.id}>
                {page.title} (/{page.slug})
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[160px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">Статус</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as (typeof STATUS_FILTERS)[number])}
            className="w-full border rounded px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {STATUS_FILTERS.map((status) => (
              <option key={status} value={status}>
                {STATUS_FILTER_LABEL[status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border divide-y">
        {postsLoading && <p className="p-4 text-gray-400 text-sm">Завантаження...</p>}
        {isError && <p className="p-4 text-red-400 text-sm">Помилка завантаження постів.</p>}
        {!postsLoading && !isError && filteredPosts.length === 0 && (
          <p className="p-4 text-gray-400 text-sm">
            {posts?.length ? 'Нічого не знайдено за заданими фільтрами.' : 'Постів немає.'}
          </p>
        )}
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{post.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">/{post.slug}</p>
            </div>
            <div className="flex items-center gap-3 ml-4 shrink-0">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_CLASS[post.status] ?? ''}`}
              >
                {STATUS_LABEL[post.status] ?? post.status}
              </span>
              <Link
                href={`/admin/posts/${post.id}`}
                className="text-xs text-blue-500 hover:underline"
              >
                Редагувати
              </Link>
              <button
                onClick={() => setPostToDelete(post)}
                className="text-xs text-red-400 hover:text-red-600 hover:underline"
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Видалити пост?</AlertDialogTitle>
            <AlertDialogDescription>
              «{postToDelete?.title}» буде видалено безповоротно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Скасувати</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isPending}>
              {isPending ? 'Видалення...' : 'Видалити'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
