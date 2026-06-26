'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetPostById, useUpdatePost } from '@/lib/api/admin/post/api-get-posts';
import { useCreatePost } from '@/lib/api/admin/post/api-get-posts';
import { generateSlug } from '@/lib/utils/slugify';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, LayoutTemplate, Trash2, Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import AsideMenu from './components/AsideMenu';
import { ActiveComponent, PostFormValues, useConstructorLogic } from './hooks/useConstructorLogic';

interface PostConstructorProps {
  id?: string;
  defaultPageId?: string;
}

interface SortableItemProps {
  id: string;
  onDelete: () => void;
  children: React.ReactNode;
}

const SortableItem = ({ id, onDelete, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-start gap-3 rounded-xl border px-4 py-3 ${
        isDragging
          ? 'border-blue-200 bg-blue-50/60 shadow-lg opacity-90'
          : 'border-transparent bg-white hover:border-slate-200'
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="mt-2.5 shrink-0 cursor-grab rounded-md p-0.5 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-slate-500 active:cursor-grabbing focus:outline-none"
        tabIndex={-1}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <div className="min-w-0 flex-1">{children}</div>

      <button
        onClick={onDelete}
        className="mt-2 shrink-0 rounded-lg p-1.5 text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 focus:outline-none"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

const BlockField = ({
  comp,
  form,
}: {
  comp: ActiveComponent;
  form: UseFormReturn<PostFormValues>;
}) => {
  const value = useWatch({ control: form.control, name: comp.instanceKey, defaultValue: '' });
  return <>{comp.component(value, (v) => form.setValue(comp.instanceKey, v))}</>;
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="mb-4 rounded-2xl bg-slate-100 p-5">
      <LayoutTemplate className="h-8 w-8 text-slate-400" />
    </div>
    <p className="text-sm font-medium text-slate-600">Полотно порожнє</p>
    <p className="mt-1 text-xs text-slate-400">Додайте блоки з панелі зліва</p>
  </div>
);

export const PostConstructor = ({ id, defaultPageId }: PostConstructorProps) => {
  const { data: existingPost, isLoading: postLoading } = useGetPostById(id ?? '');
  const router = useRouter();
  const {
    activeComponents,
    addComponent,
    deleteComponent,
    availableComponents,
    reorderComponents,
    pages,
    selectedPageId,
    setSelectedPageId,
    form,
    getFormData,
    handleTitleChange,
    handleSlugChange,
  } = useConstructorLogic(existingPost, defaultPageId);

  const { mutateAsync: createPost, isPending: creating } = useCreatePost();
  const { mutateAsync: updatePost, isPending: updating } = useUpdatePost();
  const isPending = creating || updating;

  const titleValue = useWatch({ control: form.control, name: 'title', defaultValue: '' });
  const slugValue = useWatch({ control: form.control, name: 'slug', defaultValue: '' });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = activeComponents.findIndex((c) => c.instanceKey === active.id);
      const newIndex = activeComponents.findIndex((c) => c.instanceKey === over.id);
      if (oldIndex !== -1 && newIndex !== -1) reorderComponents(oldIndex, newIndex);
    }
  };

  const handlePublish = form.handleSubmit(async () => {
    const data = getFormData();
    if (id) {
      await updatePost({ id, ...data });
      toast.success('Пост оновлено');
      router.back();
    } else {
      await createPost(data);
      toast.success('Пост створено');
      router.push('/admin/posts');
    }
  });

  if (id && postLoading) {
    return <p className="text-sm text-slate-400 p-4">Завантаження поста...</p>;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            {id ? 'Редагування' : 'Створення'}
          </p>
          <h1 className="mt-0.5 text-2xl font-semibold text-slate-800">
            {id ? 'Редагувати пост' : 'Новий пост'}
          </h1>
        </div>
        <Button
          size="sm"
          className="bg-slate-900 text-white hover:bg-slate-700"
          onClick={handlePublish}
          disabled={isPending}
        >
          {isPending ? 'Збереження...' : id ? 'Зберегти' : 'Опублікувати'}
        </Button>
      </div>

      <div className="flex flex-1 gap-5">
        <AsideMenu
          onAdd={addComponent}
          availableComponents={availableComponents}
          pages={pages}
          selectedPageId={selectedPageId}
          onPageChange={setSelectedPageId}
          form={form}
        />

        <div className="flex min-h-130 flex-1 flex-col rounded-2xl border border-slate-200 bg-slate-50/50">
          <div className="border-b border-slate-200 px-6 py-4 space-y-2">
            <Input
              value={titleValue}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Заголовок допису..."
              className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-0 placeholder:text-slate-300 h-auto"
            />
            <div className="flex justify-start items-center gap-1.5 text-xs text-slate-400">
              <span className="shrink-0">slug:</span>
              <Input
                value={slugValue}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="url-slug"
                className="border-none shadow-none focus-visible:ring-0 px-0 h-auto text-xs text-slate-500 font-mono w-[30%]"
              />
              <button
                type="button"
                onClick={() => {
                  if (titleValue) {
                    const newSlug = generateSlug(titleValue);
                    handleSlugChange(newSlug);
                  }
                }}
                title="Згенерувати з заголовка"
                className=" text-slate-300 hover:text-blue-500 transition-colors"
              >
                <Wand2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {activeComponents.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="p-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={activeComponents.map((c) => c.instanceKey)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-1">
                    {activeComponents.map((comp) => (
                      <SortableItem
                        key={comp.instanceKey}
                        id={comp.instanceKey}
                        onDelete={() => deleteComponent(comp)}
                      >
                        <BlockField comp={comp} form={form} />
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
