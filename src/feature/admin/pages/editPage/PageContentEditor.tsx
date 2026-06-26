'use client';

import { Button } from '@/components/ui/button';
import { PageBlock } from '@/lib/api/admin/pages/api-pages';
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
import { GripVertical, LayoutTemplate, Plus, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { POST_COMPONENTS, PostComponent } from '../../posts/constructor/const';
import { useForm, useWatch } from 'react-hook-form';

const ALLOWED_KEYS = ['heading', 'text', 'quote', 'warning', 'divider', 'list', 'code', 'image', 'video'];
const PAGE_COMPONENTS = POST_COMPONENTS.filter((c) => ALLOWED_KEYS.includes(c.name));

type ActiveBlock = PostComponent & { instanceKey: string };
type FormValues = Record<string, string>;

interface SortableBlockProps {
  id: string;
  onDelete: () => void;
  children: React.ReactNode;
}

const SortableBlock = ({ id, onDelete, children }: SortableBlockProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition, zIndex: isDragging ? 10 : 1 }}
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

interface Props {
  initialContent?: PageBlock[];
  onChange: (blocks: PageBlock[]) => void;
}

export const PageContentEditor = ({ initialContent = [], onChange }: Props) => {
  const [blocks, setBlocks] = useState<ActiveBlock[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const form = useForm<FormValues>({ defaultValues: {} });
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialized || initialContent.length === 0) return;
    const loaded: ActiveBlock[] = initialContent.map((block, i) => {
      const found = PAGE_COMPONENTS.find((c) => c.name === block.type);
      if (!found) return null;
      const instanceKey = `${block.type}_${i}_init`;
      form.setValue(instanceKey, block.value);
      return { ...found, instanceKey };
    }).filter(Boolean) as ActiveBlock[];
    setBlocks(loaded);
    setInitialized(true);
  }, [initialContent, initialized, form]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.instanceKey === active.id);
    const newIndex = blocks.findIndex((b) => b.instanceKey === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const next = [...blocks];
    const [moved] = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved);
    setBlocks(next);
    notifyChange(next);
  };

  const addBlock = (component: PostComponent) => {
    const instanceKey = `${component.name}_${Date.now()}`;
    form.setValue(instanceKey, '');
    const next = [...blocks, { ...component, instanceKey }];
    setBlocks(next);
    setShowPicker(false);
    notifyChange(next);
  };

  const deleteBlock = (instanceKey: string) => {
    form.unregister(instanceKey);
    const next = blocks.filter((b) => b.instanceKey !== instanceKey);
    setBlocks(next);
    notifyChange(next);
  };

  const notifyChange = (current: ActiveBlock[]) => {
    const values = form.getValues();
    onChange(current.map((b) => ({ type: b.name, value: values[b.instanceKey] ?? '' })));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Контент сторінки</h3>
        <div className="relative" ref={pickerRef}>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => setShowPicker((v) => !v)}
          >
            <Plus className="w-4 h-4" />
            Додати блок
          </Button>
          {showPicker && (
            <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-slate-200 rounded-xl shadow-lg p-2 grid grid-cols-2 gap-1 w-56">
              {PAGE_COMPONENTS.map((comp) => (
                <button
                  key={comp.key}
                  type="button"
                  onClick={() => addBlock(comp)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors text-left"
                >
                  <span className="text-slate-400">{comp.icon}</span>
                  {comp.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {blocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-200 rounded-xl">
          <div className="mb-3 rounded-2xl bg-slate-100 p-4">
            <LayoutTemplate className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-600">Контент відсутній</p>
          <p className="mt-1 text-xs text-slate-400">Натисніть «Додати блок» щоб почати</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={blocks.map((b) => b.instanceKey)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-1">
                {blocks.map((block) => (
                  <SortableBlock
                    key={block.instanceKey}
                    id={block.instanceKey}
                    onDelete={() => deleteBlock(block.instanceKey)}
                  >
                    <BlockField block={block} form={form} onChangeNotify={() => notifyChange(blocks)} />
                  </SortableBlock>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

const BlockField = ({
  block,
  form,
  onChangeNotify,
}: {
  block: ActiveBlock;
  form: ReturnType<typeof useForm<FormValues>>;
  onChangeNotify: () => void;
}) => {
  const value = useWatch({ control: form.control, name: block.instanceKey, defaultValue: '' });
  return (
    <>
      {block.component(value, (v) => {
        form.setValue(block.instanceKey, v);
        onChangeNotify();
      })}
    </>
  );
};
