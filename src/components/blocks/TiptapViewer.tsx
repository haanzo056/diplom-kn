'use client';

import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const extensions = [
  StarterKit.configure({ codeBlock: false }),
  Underline,
  CodeBlock,
  Link.configure({ openOnClick: false }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
];

const baseClass = `
  [&_.tiptap]:outline-none
  [&_.tiptap_p]:my-2 [&_.tiptap_p]:text-slate-700 [&_.tiptap_p]:leading-relaxed
  [&_.tiptap_h1]:text-3xl [&_.tiptap_h1]:font-bold [&_.tiptap_h1]:text-slate-900 [&_.tiptap_h1]:mt-6 [&_.tiptap_h1]:mb-3
  [&_.tiptap_h2]:text-2xl [&_.tiptap_h2]:font-bold [&_.tiptap_h2]:text-slate-900 [&_.tiptap_h2]:mt-5 [&_.tiptap_h2]:mb-2
  [&_.tiptap_h3]:text-xl [&_.tiptap_h3]:font-semibold [&_.tiptap_h3]:text-slate-900 [&_.tiptap_h3]:mt-4 [&_.tiptap_h3]:mb-2
  [&_.tiptap_strong]:font-bold
  [&_.tiptap_em]:italic
  [&_.tiptap_u]:underline
  [&_.tiptap_a]:text-blue-600 [&_.tiptap_a]:underline
  [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6 [&_.tiptap_ul]:my-2
  [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_ol]:my-2
  [&_.tiptap_li]:my-0.5
  [&_.tiptap_blockquote]:border-l-4 [&_.tiptap_blockquote]:border-slate-300 [&_.tiptap_blockquote]:pl-4 [&_.tiptap_blockquote]:italic [&_.tiptap_blockquote]:text-slate-600
  [&_.tiptap_pre]:bg-slate-900 [&_.tiptap_pre]:text-slate-50 [&_.tiptap_pre]:rounded-xl [&_.tiptap_pre]:p-4 [&_.tiptap_pre]:my-4 [&_.tiptap_pre]:overflow-x-auto
  [&_.tiptap_code]:font-mono [&_.tiptap_code]:text-sm
`;

function parseContent(value: string) {
  try { return JSON.parse(value); } catch { return value || ''; }
}

export function TiptapViewer({ value, variant = 'default' }: { value: string; variant?: 'default' | 'quote' | 'code' }) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions,
    content: parseContent(value),
  });

  if (!editor) return null;

  if (variant === 'quote') {
    return (
      <blockquote className="border-l-4 border-blue-500 bg-slate-50 pl-5 pr-4 py-3 my-6 rounded-r-lg italic text-slate-600">
        <EditorContent editor={editor} className={baseClass} />
      </blockquote>
    );
  }

  if (variant === 'code') {
    return (
      <div className="bg-slate-900 rounded-xl p-4 my-4 overflow-x-auto">
        <EditorContent
          editor={editor}
          className={`${baseClass}
            [&_.tiptap_p]:text-slate-50 [&_.tiptap_p]:font-mono [&_.tiptap_p]:text-sm
            [&_.tiptap_pre]:bg-transparent [&_.tiptap_pre]:p-0
          `}
        />
      </div>
    );
  }

  return <EditorContent editor={editor} className={`mb-4 ${baseClass}`} />;
}
