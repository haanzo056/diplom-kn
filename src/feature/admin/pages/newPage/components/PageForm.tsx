'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Globe, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';

interface PageFormValues {
  title: string;
  slug: string;
  published: boolean;
}

interface PageFormProps {
  id?: string;
  defaultValues?: { title: string; slug: string; published: boolean };
  onSubmit: (title: string, slug: string, published: boolean) => Promise<void>;
  isPending: boolean;
}

const toSlug = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const PageForm = ({ id, defaultValues, onSubmit, isPending }: PageFormProps) => {
  const router = useRouter();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PageFormValues>({
    defaultValues: defaultValues ?? { title: '', slug: '', published: false },
  });

  const onSubmitHandler = handleSubmit(({ title, slug, published }) => {
    onSubmit(title, slug, published);
  });

  const titleValue = useWatch({ control, name: 'title', defaultValue: '' });
  const published = useWatch({ control, name: 'published', defaultValue: false });
  const slugValue = useWatch({ control, name: 'slug', defaultValue: '' });

  const handleTitleChange = (v: string) => {
    setValue('title', v);
    setValue('slug', toSlug(v));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link href="/admin/pages">
        <Button variant="ghost" className="mb-6 -ml-4 text-slate-500">
          <ArrowLeft className="w-4 h-4 mr-2" />До списку сторінок
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          {id ? 'Редагування сторінки' : 'Нова сторінка'}
        </h1>
        <p className="text-slate-500 mt-2">
          {id ? `ID: ${id}` : 'Створення нової статичної сторінки'}
        </p>
      </div>

      <form className="space-y-8" onSubmit={onSubmitHandler}>
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Заголовок сторінки
            </Label>
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
            <Label htmlFor="slug" className="text-base font-semibold">
              URL-адрес (Slug)
            </Label>
            <div className="flex items-center">
              <span className="bg-slate-100 border border-r-0 border-slate-200 text-slate-500 px-4 py-2.5 rounded-l-md text-sm">
                /
              </span>
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

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Налаштування публікації</h3>
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <Label htmlFor="published" className="text-base font-medium cursor-pointer">
                  Опублікувати
                </Label>
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

        <div className="flex items-center justify-end gap-4 pt-4">
          <Link href="/admin/pages">
            <Button variant="outline" type="button">
              Скасувати
            </Button>
          </Link>
          <Button type="submit" className="gap-2" disabled={isPending}>
            <Save className="w-4 h-4" />
            {isPending ? 'Збереження...' : id ? 'Зберегти зміни' : 'Створити сторінку'}
          </Button>
        </div>
      </form>
    </div>
  );
};
