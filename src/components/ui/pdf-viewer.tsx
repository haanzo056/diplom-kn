'use client';

import { ExternalLink } from 'lucide-react';

export const PdfViewer = ({ url, title }: { url: string; title?: string }) => {
  const iframeUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <div className="flex flex-col items-center w-full">
      {title && <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">{title}</h2>}

      <div className="relative w-full rounded-xl overflow-hidden shadow-xl border border-slate-200">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-md flex items-center justify-center text-slate-700 transition-colors"
          title="Open in new tab"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        <iframe
          src={iframeUrl}
          className="w-full"
          style={{ height: '700px', border: 'none' }}
          title={title ?? 'PDF Viewer'}
        />
      </div>
    </div>
  );
};
