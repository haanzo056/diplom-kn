'use client';

import { useGetPostBySlug } from '@/lib/api/admin/post/api-get-posts';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import SideBar from '../allNews/components/SideBar';

const NewsPostPage = ({ slug }: { slug: string }) => {
  const { data: post, isLoading, isError } = useGetPostBySlug(slug);

  if (isLoading) {
    return (
      <div className="bg-[#f4f5f7] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-slate-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="bg-[#f4f5f7] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-red-400">Пост не найден.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f5f7] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад к новостям
        </Link>

        <div className="flex flex-col lg:flex-row gap-10">
          <main className="flex-1 min-w-0">
            <h1 className="text-[32px] md:text-[40px] font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {post.image && (
              <div className="mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto max-h-125 object-cover rounded-2xl"
                />
              </div>
            )}

            {post.publishedAt && (
              <div className="flex items-center gap-2 text-slate-400 font-medium mb-8">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.publishedAt).toLocaleDateString('ru-RU')}</span>
              </div>
            )}

            {post.excerpt && (
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">{post.excerpt}</p>
            )}

            <article>
              <BlockRenderer blocks={post.blocks} />
            </article>
          </main>

          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default NewsPostPage;
