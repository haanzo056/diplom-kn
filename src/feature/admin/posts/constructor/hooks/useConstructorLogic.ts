import { PostDetail } from '@/lib/api/admin/post/api-get-posts';
import { PostBlock, PostCategory } from '@/lib/api/admin/post/api-get-posts';
import { Page } from '@/generated/prisma/client';
import { generateSlug } from '@/lib/utils/slugify';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { POST_COMPONENTS, PostComponent } from '../const';

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type PostFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  status: PostStatus;
  category: PostCategory;
} & Record<string, string>;

export type ActiveComponent = PostComponent & { instanceKey: string };

export const useConstructorLogic = (initialData?: PostDetail, defaultPageId?: string | null, defaultCategory?: PostCategory) => {
  const form = useForm<PostFormValues>({
    defaultValues: {
      title: initialData?.title ?? '',
      slug: initialData?.slug ?? '',
      excerpt: initialData?.excerpt ?? '',
      image: initialData?.image ?? '',
      status: initialData?.status ?? 'PUBLISHED',
      category: initialData?.category ?? defaultCategory ?? 'OTHER',
    },
  });

  const [activeComponents, setActiveComponents] = useState<ActiveComponent[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(initialData?.pageId ?? defaultPageId ?? null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const slugDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch('/api/pages')
      .then((r) => r.json())
      .then((data: Page[]) => setPages(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!initialData || initialized) return;
    form.reset({
      title: initialData.title,
      slug: initialData.slug,
      excerpt: initialData.excerpt ?? '',
      image: initialData.image ?? '',
      status: initialData.status,
      category: initialData.category,
    });
    setSelectedPageId(initialData.pageId ?? null);
    const components: ActiveComponent[] = initialData.blocks.map((block, i) => {
      const found = POST_COMPONENTS.find((c) => c.name === block.type);
      if (!found) return null;
      const instanceKey = `${block.type}_${i}_${Date.now()}`;
      form.setValue(instanceKey, block.value);
      return { ...found, instanceKey };
    }).filter(Boolean) as ActiveComponent[];
    setActiveComponents(components);
    setInitialized(true);
  }, [initialData, initialized, form]);

  const handleTitleChange = (value: string) => {
    form.setValue('title', value);
    if (!slugManuallyEdited) {
      if (slugDebounceRef.current) clearTimeout(slugDebounceRef.current);
      slugDebounceRef.current = setTimeout(() => {
        form.setValue('slug', generateSlug(value));
      }, 400);
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    form.setValue('slug', generateSlug(value));
  };

  const reorderComponents = (fromIndex: number, toIndex: number) => {
    setActiveComponents((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const addComponent = (component: PostComponent) => {
    const instanceKey = `${component.name}_${Date.now()}`;
    setActiveComponents((prev) => [...prev, { ...component, instanceKey }]);
    form.setValue(instanceKey, '');
  };

  const deleteComponent = (instance: ActiveComponent) => {
    setActiveComponents((prev) => prev.filter((c) => c.instanceKey !== instance.instanceKey));
    form.unregister(instance.instanceKey);
  };

  const getFormData = () => {
    const values = form.getValues();
    return {
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt || undefined,
      image: values.image || undefined,
      status: values.status,
      category: values.category || undefined,
      pageId: selectedPageId,
      blocks: activeComponents.map((comp) => ({
        type: comp.name as PostBlock['type'],
        value: values[comp.instanceKey] ?? '',
      })),
    };
  };

  return {
    activeComponents,
    availableComponents: POST_COMPONENTS,
    reorderComponents,
    addComponent,
    deleteComponent,
    pages,
    selectedPageId,
    setSelectedPageId,
    form,
    getFormData,
    handleTitleChange,
    handleSlugChange,
  };
};
