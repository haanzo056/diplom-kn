'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PageBlock, useGetPage, useUpdatePage } from '@/lib/api/admin/pages/api-pages';
import { useGetPosts } from '@/lib/api/admin/post/api-get-posts';
import { ArrowLeft, FileStack, Globe, LayoutPanelTop, Plus, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';
import { useForm, useWatch } from 'react-hook-form';
import { PageContentEditor } from './PageContentEditor';

const POST_STATUS_LABEL = { DRAFT: 'Чернетка', PUBLISHED: 'Опубліковано', ARCHIVED: 'Архів' } as const;
const POST_STATUS_CLASS = {
  DRAFT: 'bg-slate-100 text-slate-500',
  PUBLISHED: 'bg-green-100 text-green-700',
  ARCHIVED: 'bg-amber-100 text-amber-700',
} as const;

const PagePosts = ({ pageId }: { pageId: string }) => {
  const { data: posts, isLoading } = useGetPosts(pageId);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div className="flex items-start gap-3">
          <FileStack className="w-5 h-5 text-slate-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Пости сторінки</h3>
            <p className="text-sm text-slate-500">
              Окремі публікації (новини, статті тощо), прив&apos;язані до цієї сторінки —
              відображаються списком на ній, на відміну від контенту вище.
            </p>
          </div>
        </div>
        <Link href={`/admin/posts/new?pageId=${pageId}`}>
          <Button type="button" variant="outline" size="sm" className="gap-1.5 shrink-0">
            <Plus className="w-4 h-4" />
            Додати пост
          </Button>
        </Link>
      </div>

      <div className="mt-4 rounded-lg border border-slate-100 divide-y">
        {isLoading && <p className="p-4 text-sm text-slate-400">Завантаження...</p>}
        {!isLoading && posts?.length === 0 && (
          <p className="p-4 text-sm text-slate-400">До цієї сторінки ще не прив&apos;язано жодного поста.</p>
        )}
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
          >
            <p className="text-sm font-medium text-slate-800 truncate">{post.title}</p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ml-3 ${POST_STATUS_CLASS[post.status]}`}
            >
              {POST_STATUS_LABEL[post.status]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

interface FormValues {
  title: string;
  slug: string;
  published: boolean;
}

const toSlug = (v: string) =>
  v.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const EditPageForm = ({ id, page }: { id: string; page: { title: string; slug: string; status: string; content: unknown } }) => {
  const router = useRouter();
  const { mutateAsync: updatePage, isPending } = useUpdatePage();
  const contentRef = useRef<PageBlock[]>((page.content as PageBlock[]) ?? []);

  const { control, setValue, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: page.title,
      slug: page.slug,
      published: page.status === 'PUBLISHED',
    },
  });

  const titleValue = useWatch({ control, name: 'title', defaultValue: page.title });
  const slugValue = useWatch({ control, name: 'slug', defaultValue: page.slug });
  const published = useWatch({ control, name: 'published', defaultValue: page.status === 'PUBLISHED' });

  const handleTitleChange = (v: string) => {
    setValue('title', v);
    setValue('slug', toSlug(v));
  };

  const onSubmit = handleSubmit(async ({ title, slug, published }) => {
    try {
      await updatePage({
        id,
        title,
        slug,
        status: published ? 'PUBLISHED' : 'DRAFT',
        content: contentRef.current,
      });
      toast.success('Зміни збережено');
      router.push('/admin/pages');
    } catch {
      toast.error('Не вдалося зберегти зміни');
    }
  });

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link href="/admin/pages">
        <Button variant="ghost" className="mb-6 -ml-4 text-slate-500">
          <ArrowLeft className="w-4 h-4 mr-2" />
          До списку сторінок
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Редагування сторінки</h1>
        <p className="text-slate-500 mt-1 text-sm">ID: {id}</p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        {/* Основные поля */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">Заголовок сторінки</Label>
            <Input
              id="title"
              value={titleValue}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Наприклад: Правила прийому"
              className="text-lg py-6"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-base font-semibold">URL-адреса (Slug)</Label>
            <div className="flex items-center">
              <span className="bg-slate-100 border border-r-0 border-slate-200 text-slate-500 px-4 py-2.5 rounded-l-md text-sm">/</span>
              <Input
                id="slug"
                value={slugValue}
                onChange={(e) => setValue('slug', toSlug(e.target.value))}
                placeholder="admission-rules"
                className="rounded-l-none focus-visible:ring-1"
              />
            </div>
            {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
          </div>
        </div>

        {/* Публикация */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Налаштування публікації</h3>
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <Label htmlFor="published" className="text-base font-medium cursor-pointer">Опублікувати</Label>
                <p className="text-sm text-slate-500">Зробити сторінку доступною для відвідувачів</p>
              </div>
            </div>
            <Switch
              id="published"
              checked={published}
              onCheckedChange={(v) => setValue('published', v)}
            />
          </div>
        </div>

        {/* Контент редактор */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <LayoutPanelTop className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Контент самої сторінки</h3>
              <p className="text-sm text-slate-500">
                Блоки, які виводяться безпосередньо на цій сторінці (текст, зображення тощо).
                Це не пости — для них є окремий розділ нижче.
              </p>
            </div>
          </div>
          <PageContentEditor
            initialContent={(page.content as PageBlock[]) ?? []}
            onChange={(blocks) => { contentRef.current = blocks; }}
          />
        </div>

        {/* Посты страницы */}
        <PagePosts pageId={id} />

        <div className="flex items-center justify-end gap-4 pt-2">
          <Link href="/admin/pages">
            <Button variant="outline" type="button">Скасувати</Button>
          </Link>
          <Button type="submit" className="gap-2" disabled={isPending}>
            <Save className="w-4 h-4" />
            {isPending ? 'Збереження...' : 'Зберегти зміни'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export const EditPage = ({ id }: { id: string }) => {
  const { data: page, isLoading } = useGetPage(id);

  if (isLoading) return <p className="p-4 text-sm text-slate-400">Завантаження...</p>;
  if (!page) return <p className="p-4 text-sm text-red-400">Сторінку не знайдено.</p>;

  return <EditPageForm id={id} page={page} />;
};
