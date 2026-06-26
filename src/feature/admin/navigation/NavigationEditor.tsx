'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  GetNavigationResponse,
  useCreateNavigationItem,
  useDeleteNavigationItem,
  useGetNavigation,
  useReorderNavigation,
  useUpdateNavigationItem,
} from '@/lib/api/admin/navigation/api-navigation';
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, GripVertical, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type NavItem = GetNavigationResponse;
type Group = NavItem & { children: NavItem[] };

function buildTree(items: NavItem[]): Group[] {
  return items
    .filter((item) => !item.parentId)
    .sort((a, b) => a.order - b.order)
    .map((group) => ({
      ...group,
      children: items
        .filter((item) => item.parentId === group.id)
        .sort((a, b) => a.order - b.order),
    }));
}

interface InlineFormProps {
  initialLabel?: string;
  initialHref?: string;
  onSave: (label: string, href: string) => void;
  onCancel: () => void;
  pending?: boolean;
}

const InlineForm = ({ initialLabel = '', initialHref = '', onSave, onCancel, pending }: InlineFormProps) => {
  const [label, setLabel] = useState(initialLabel);
  const [href, setHref] = useState(initialHref);

  return (
    <form
      className="flex flex-1 items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!label.trim() || !href.trim()) return;
        onSave(label.trim(), href.trim());
      }}
    >
      <Input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Назва"
        className="h-8 text-sm"
        autoFocus
      />
      <Input
        value={href}
        onChange={(e) => setHref(e.target.value)}
        placeholder="/посилання"
        className="h-8 text-sm"
      />
      <Button type="submit" size="icon-sm" variant="ghost" disabled={pending} aria-label="Зберегти">
        <Check className="w-4 h-4 text-green-600" />
      </Button>
      <Button type="button" size="icon-sm" variant="ghost" onClick={onCancel} aria-label="Скасувати">
        <X className="w-4 h-4 text-slate-400" />
      </Button>
    </form>
  );
};

interface RowProps {
  item: NavItem;
  onEdit: (label: string, href: string) => void;
  onDelete: () => void;
  pending?: boolean;
}

const SortableRow = ({ item, onEdit, onDelete, pending }: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const [editing, setEditing] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition, zIndex: isDragging ? 10 : 1 }}
      className={`group flex items-center gap-2 rounded-lg border px-3 py-2 ${
        isDragging ? 'border-blue-200 bg-blue-50/60 shadow-md' : 'border-transparent bg-white hover:border-slate-200'
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="shrink-0 cursor-grab rounded-md p-0.5 text-slate-300 hover:text-slate-500 active:cursor-grabbing focus:outline-none"
        tabIndex={-1}
        aria-label="Перетягнути"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {editing ? (
        <InlineForm
          initialLabel={item.label}
          initialHref={item.href}
          pending={pending}
          onSave={(label, href) => {
            onEdit(label, href);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          <div className="min-w-0 flex-1 flex items-baseline gap-3">
            <span className="text-sm font-medium text-slate-800 truncate">{item.label}</span>
            <span className="text-xs text-slate-400 truncate">{item.href}</span>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="shrink-0 rounded-md p-1.5 text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
            aria-label="Редагувати"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="shrink-0 rounded-md p-1.5 text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 focus:outline-none"
            aria-label="Видалити"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </>
      )}
    </div>
  );
};

export const NavigationEditor = () => {
  const { data, isLoading } = useGetNavigation();
  const createItem = useCreateNavigationItem();
  const updateItem = useUpdateNavigationItem();
  const deleteItem = useDeleteNavigationItem();
  const reorder = useReorderNavigation();

  const [addingGroup, setAddingGroup] = useState(false);
  const [addingChildFor, setAddingChildFor] = useState<string | null>(null);

  const groups = useMemo(() => buildTree(data ?? []), [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleGroupDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = groups.findIndex((g) => g.id === active.id);
    const newIndex = groups.findIndex((g) => g.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(groups, oldIndex, newIndex);
    reorder.mutate(reordered.map((g, i) => ({ id: g.id, order: i, parentId: null })));
  };

  const handleChildDragEnd = (group: Group) => (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = group.children.findIndex((c) => c.id === active.id);
    const newIndex = group.children.findIndex((c) => c.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(group.children, oldIndex, newIndex);
    reorder.mutate(reordered.map((c, i) => ({ id: c.id, order: i, parentId: group.id })));
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Навігація</h1>
        <p className="text-sm text-gray-400">Завантаження...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Навігація</h1>
        <p className="text-sm text-gray-400">Перетягуйте пункти, щоб змінити порядок</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleGroupDragEnd}>
        <SortableContext items={groups.map((g) => g.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-4">
            {groups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl border border-slate-200 p-4">
                <SortableRow
                  item={group}
                  pending={updateItem.isPending}
                  onEdit={(label, href) => updateItem.mutate({ id: group.id, label, href })}
                  onDelete={() => deleteItem.mutate(group.id)}
                />

                <div className="mt-2 ml-7 pl-3 border-l border-slate-100">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleChildDragEnd(group)}
                  >
                    <SortableContext items={group.children.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                      <div className="flex flex-col gap-1">
                        {group.children.map((child) => (
                          <SortableRow
                            key={child.id}
                            item={child}
                            pending={updateItem.isPending}
                            onEdit={(label, href) => updateItem.mutate({ id: child.id, label, href })}
                            onDelete={() => deleteItem.mutate(child.id)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>

                  {addingChildFor === group.id ? (
                    <div className="flex items-center gap-2 px-3 py-2">
                      <div className="w-4" />
                      <InlineForm
                        pending={createItem.isPending}
                        onSave={(label, href) => {
                          createItem.mutate({ label, href, parentId: group.id });
                          setAddingChildFor(null);
                        }}
                        onCancel={() => setAddingChildFor(null)}
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingChildFor(group.id)}
                      className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#3D5AF1] hover:text-[#2d4ae0] px-3 py-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Додати посилання
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {groups.length === 0 && !addingGroup && (
        <p className="text-sm text-gray-400 mb-4">Пунктів навігації ще немає.</p>
      )}

      {addingGroup ? (
        <div className="bg-white rounded-xl border border-slate-200 p-4 mt-4 flex items-center gap-2">
          <div className="w-4" />
          <InlineForm
            pending={createItem.isPending}
            onSave={(label, href) => {
              createItem.mutate({ label, href, parentId: null });
              setAddingGroup(false);
            }}
            onCancel={() => setAddingGroup(false)}
          />
        </div>
      ) : (
        <Button variant="outline" className="mt-4 gap-1.5" onClick={() => setAddingGroup(true)}>
          <Plus className="w-4 h-4" />
          Додати розділ меню
        </Button>
      )}
    </div>
  );
};
