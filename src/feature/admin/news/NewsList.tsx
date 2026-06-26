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

export const NewsList = () => {
  const [search, setSearch] = useState('');
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const { data: posts, isLoading, isError } = useGetPosts();
  const { mutate: deletePost, isPending } = useDeletePost();

  const newsPosts = (posts ?? []).filter(
    (p) =>
      p.category === 'NEWS' &&
      (!search.trim() || p.title.toLowerCase().includes(search.trim().toLowerCase())),
  );

  const handleConfirmDelete = () => {
    if (!postToDelete) return;
    deletePost(postToDelete.id, { onSuccess: () => setPostToDelete(null) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Новини</h1>
        <Link
          href="/admin/news/new"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Додати новину
        </Link>
      </div>

      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук за назвою..."
          className="w-full max-w-sm border rounded px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg border divide-y">
        {isLoading && <p className="p-4 text-gray-400 text-sm">Завантаження...</p>}
        {isError && <p className="p-4 text-red-400 text-sm">Помилка завантаження новин.</p>}
        {!isLoading && !isError && newsPosts.length === 0 && (
          <p className="p-4 text-gray-400 text-sm">Новин немає.</p>
        )}
        {newsPosts.map((post) => (
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
            <AlertDialogTitle>Видалити новину?</AlertDialogTitle>
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
