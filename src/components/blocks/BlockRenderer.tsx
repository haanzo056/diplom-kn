import { TiptapViewer } from './TiptapViewer';

export type PageBlock = { type: string; value: string };

function getYoutubeEmbedUrl(raw: string): string | null {
  const url = raw.trim();
  if (!url) return null;
  const full = url.startsWith('http') ? url : `https://${url}`;
  try {
    const u = new URL(full);
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (u.hostname.includes('vimeo.com')) {
      const match = u.pathname.match(/\/(\d+)/);
      if (match) return `https://player.vimeo.com/video/${match[1]}`;
    }
  } catch { /* ignore */ }
  return null;
}

function renderBlock(block: PageBlock, index: number) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 key={index} className="text-2xl font-bold text-slate-900 mt-8 mb-3">
          {block.value}
        </h2>
      );

    case 'text':
      return <TiptapViewer key={index} value={block.value} />;

    case 'quote':
      return <TiptapViewer key={index} value={block.value} variant="quote" />;

    case 'code':
      return <TiptapViewer key={index} value={block.value} variant="code" />;

    case 'warning':
      return (
        <div key={index} className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4 flex gap-3">
          <span className="text-amber-600 text-lg shrink-0">⚠</span>
          <p className="text-amber-900 text-sm leading-relaxed">{block.value}</p>
        </div>
      );

    case 'divider':
      return (
        <div key={index} className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-slate-200" />
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </div>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      );

    case 'list': {
      const items = block.value ? block.value.split('\n').filter(Boolean) : [];
      if (items.length === 0) return null;
      return (
        <ul key={index} className="list-disc pl-6 space-y-1 my-4 text-slate-700">
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    }

    case 'video': {
      const embedUrl = getYoutubeEmbedUrl(block.value);
      if (!embedUrl) return null;
      return (
        <div key={index} className="my-6 aspect-video rounded-xl overflow-hidden border border-slate-200">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    case 'image':
      if (!block.value) return null;
      return (
        <figure key={index} className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.value} alt="" className="w-full rounded-xl object-cover" />
        </figure>
      );

    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: unknown }) {
  if (!Array.isArray(blocks)) return null;
  return <>{(blocks as PageBlock[]).map((block, i) => renderBlock(block, i))}</>;
}
