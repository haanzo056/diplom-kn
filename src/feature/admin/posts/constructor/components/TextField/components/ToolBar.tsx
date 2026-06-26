'use client';

import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Italic,
  Link,
  List,
  ListOrdered,
  Underline,
} from 'lucide-react';
import { useState } from 'react';
import type { TextFieldVariant } from '../types';

interface ToolbarProps {
  editor: Editor;
  variant?: TextFieldVariant;
}

function Btn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`p-1.5 rounded transition-colors ${
        active ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-4 bg-slate-200 mx-0.5" />;
}

export default function Toolbar({ editor, variant = 'default' }: ToolbarProps) {
  const [showLink, setShowLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const openLink = () => {
    setLinkUrl(editor.getAttributes('link').href ?? 'https://');
    setShowLink(true);
  };

  const applyLink = () => {
    if (!linkUrl || linkUrl === 'https://') {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl, target: '_blank' }).run();
    }
    setShowLink(false);
  };

  const isQuote = variant === 'quote';

  return (
    <div className="border-b border-black/5">
      <div className="flex items-center flex-wrap gap-0.5 px-2 py-1.5">
        <Btn title="Жирний" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold className="w-3.5 h-3.5" />
        </Btn>
        <Btn title="Курсив" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic className="w-3.5 h-3.5" />
        </Btn>
        <Btn title="Підкреслення" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
          <Underline className="w-3.5 h-3.5" />
        </Btn>

        {!isQuote && (
          <>
            <Sep />
            <Btn title="Заголовок H2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
              <Heading2 className="w-3.5 h-3.5" />
            </Btn>
            <Btn title="Маркований список" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
              <List className="w-3.5 h-3.5" />
            </Btn>
            <Btn title="Нумерований список" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
              <ListOrdered className="w-3.5 h-3.5" />
            </Btn>
            <Sep />
            <Btn title="По лівому краю" onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>
              <AlignLeft className="w-3.5 h-3.5" />
            </Btn>
            <Btn title="По центру" onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>
              <AlignCenter className="w-3.5 h-3.5" />
            </Btn>
            <Btn title="По правому краю" onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>
              <AlignRight className="w-3.5 h-3.5" />
            </Btn>
          </>
        )}

        <Sep />
        <Btn title="Посилання" onClick={openLink} active={editor.isActive('link')}>
          <Link className="w-3.5 h-3.5" />
        </Btn>
      </div>

      {showLink && (
        <div className="flex items-center gap-2 px-3 py-2 border-t border-black/5 bg-black/[0.02]">
          <input
            autoFocus
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); applyLink(); }
              if (e.key === 'Escape') setShowLink(false);
            }}
            placeholder="https://..."
            className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
          />
          <button type="button" onMouseDown={(e) => { e.preventDefault(); applyLink(); }} className="text-xs font-medium text-blue-600 hover:text-blue-800">OK</button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setShowLink(false); }} className="text-xs text-slate-400 hover:text-slate-600">Скасувати</button>
        </div>
      )}
    </div>
  );
}
