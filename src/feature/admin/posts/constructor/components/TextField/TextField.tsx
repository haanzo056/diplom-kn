'use client';

import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import type { TextFieldVariant } from './types';
import Toolbar from './components/ToolBar';

export type { TextFieldVariant } from './types';

const defaultPlaceholders: Record<TextFieldVariant, string> = {
  default: 'Почніть писати текст...',
  quote: 'Введіть цитату...',
  code: "console.log('Hello World');",
};

const variantEditorClass: Record<TextFieldVariant, string> = {
  default: 'text-base text-slate-700 min-h-20',
  quote: 'text-lg italic text-slate-700 min-h-12',
  code: 'text-sm text-slate-50 font-mono min-h-28',
};

interface TextFieldProps {
  value: string;
  onChange: (v: string) => void;
  variant?: TextFieldVariant;
  placeholder?: string;
}

export default function TextField({
  value,
  onChange,
  variant = 'default',
  placeholder,
}: TextFieldProps) {
  const isCode = variant === 'code';

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlock,
      Placeholder.configure({
        placeholder: placeholder ?? defaultPlaceholders[variant],
      }),
    ],
    content: (() => {
      try { return value ? JSON.parse(value) : (isCode ? { type: 'doc', content: [{ type: 'codeBlock', content: [{ type: 'text', text: '' }] }] } : ''); }
      catch { return value || ''; }
    })(),
    onCreate({ editor }) {
      if (isCode && !value) {
        editor.commands.setCodeBlock();
      }
    },
    onUpdate({ editor }) {
      onChange(JSON.stringify(editor.getJSON()));
    },
  });

  useEffect(() => {
    if (!editor || !value) return;
    try {
      const json = JSON.parse(value);
      const current = JSON.stringify(editor.getJSON());
      if (current !== value) editor.commands.setContent(json, { emitUpdate: false });
    } catch { /* skip */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!editor) return null;

  const editorClass = `px-1 py-2 leading-relaxed outline-none
    [&_.tiptap]:outline-none [&_.tiptap]:${variantEditorClass[variant]}
    [&_.tiptap_p]:my-1
    [&_.tiptap_h2]:text-xl [&_.tiptap_h2]:font-semibold [&_.tiptap_h2]:my-2
    [&_.tiptap_a]:text-blue-600 [&_.tiptap_a]:underline [&_.tiptap_a]:cursor-pointer
    [&_.tiptap_strong]:font-bold [&_.tiptap_em]:italic [&_.tiptap_u]:underline
    [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-5 [&_.tiptap_ul]:my-1
    [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-5 [&_.tiptap_ol]:my-1
    [&_.tiptap_pre]:p-0 [&_.tiptap_pre]:bg-transparent [&_.tiptap_pre]:m-0
    [&_.tiptap_code]:font-mono [&_.tiptap_code]:text-slate-50 [&_.tiptap_code]:bg-transparent
    [&_.tiptap.is-editor-empty_p.is-empty::before]:content-[attr(data-placeholder)]
    [&_.tiptap.is-editor-empty_p.is-empty::before]:text-slate-400
    [&_.tiptap.is-editor-empty_p.is-empty::before]:pointer-events-none
    [&_.tiptap.is-editor-empty_p.is-empty::before]:float-left
    [&_.tiptap.is-editor-empty_p.is-empty::before]:h-0`;

  if (isCode) {
    return (
      <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm relative">
        <div className="absolute top-3 right-3 text-slate-500 text-xs font-sans">JavaScript</div>
        <EditorContent editor={editor} className={editorClass} />
      </div>
    );
  }

  if (variant === 'quote') {
    return (
      <div className="flex gap-4 border-l-4 border-blue-500 bg-slate-50 p-4 rounded-r-lg">
        <div className="flex-1 min-w-0">
          <Toolbar editor={editor} variant={variant} />
          <EditorContent editor={editor} className={editorClass} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-transparent hover:border-slate-200 transition-colors">
      <Toolbar editor={editor} variant={variant} />
      <EditorContent editor={editor} className={editorClass} />
    </div>
  );
}
