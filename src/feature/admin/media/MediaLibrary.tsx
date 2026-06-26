'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Trash2, Copy, Check, FileIcon, X } from 'lucide-react';
import Image from 'next/image';

type MediaFile = {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const isImage = (mime: string) => mime.startsWith('image/');

export const MediaLibrary = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/media');
    setFiles(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const upload = async (fileList: FileList) => {
    setUploading(true);
    for (const file of Array.from(fileList)) {
      const fd = new FormData();
      fd.append('file', file);
      await fetch('/api/media', { method: 'POST', body: fd });
    }
    await load();
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
  };

  const copyUrl = (file: MediaFile) => {
    navigator.clipboard.writeText(window.location.origin + file.url);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteFile = async (id: string) => {
    setDeletingId(id);
    await fetch(`/api/media/${id}`, { method: 'DELETE' });
    setFiles((f) => f.filter((x) => x.id !== id));
    if (selected?.id === id) setSelected(null);
    setDeletingId(null);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Медіатека</h1>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 bg-[#3D5AF1] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2d4ae0] transition-colors disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Завантаження...' : 'Завантажити'}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx"
          className="hidden"
          onChange={(e) => e.target.files && upload(e.target.files)}
        />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl py-6 text-center cursor-pointer transition-colors ${
          dragging ? 'border-[#3D5AF1] bg-[#3D5AF1]/5' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <Upload className="w-6 h-6 mx-auto text-slate-400 mb-1" />
        <p className="text-sm text-slate-500">Перетягніть файли сюди або натисніть для вибору</p>
      </div>

      {files.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-400 text-sm">
          Файлів немає
        </div>
      ) : (
        <div className="flex gap-4 flex-1 min-h-0">
          {/* Grid */}
          <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 content-start overflow-y-auto">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelected(file)}
                className={`relative group aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                  selected?.id === file.id ? 'border-[#3D5AF1]' : 'border-transparent hover:border-slate-300'
                }`}
              >
                {isImage(file.mimeType) ? (
                  <Image src={file.url} alt={file.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-1">
                    <FileIcon className="w-8 h-8 text-slate-400" />
                    <span className="text-xs text-slate-500 px-1 text-center truncate w-full">{file.name}</span>
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }}
                  disabled={deletingId === file.id}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-64 shrink-0 bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700 truncate">{selected.name}</span>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                {isImage(selected.mimeType) ? (
                  <Image src={selected.url} alt={selected.name} width={256} height={256} className="object-contain w-full h-full" />
                ) : (
                  <FileIcon className="w-12 h-12 text-slate-300" />
                )}
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p><span className="font-medium">Розмір:</span> {formatSize(selected.size)}</p>
                <p><span className="font-medium">Тип:</span> {selected.mimeType}</p>
                <p className="break-all"><span className="font-medium">URL:</span> {selected.url}</p>
              </div>

              <button
                onClick={() => copyUrl(selected)}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {copiedId === selected.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copiedId === selected.id ? 'Скопійовано!' : 'Копіювати URL'}
              </button>

              <button
                onClick={() => deleteFile(selected.id)}
                disabled={deletingId === selected.id}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Видалити
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
