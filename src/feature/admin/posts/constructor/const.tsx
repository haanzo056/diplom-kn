import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertCircle,
  Code,
  GalleryHorizontal,
  Heading1,
  ImageIcon,
  List,
  Minus,
  Quote,
  Type,
  UploadCloud,
  Video,
} from 'lucide-react';
import React from 'react';
import TextField from './components/TextField/TextField';

export type PostComponent = {
  key: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  component: (value: string, onChange: (v: string) => void) => React.ReactNode;
};

export const POST_COMPONENTS: PostComponent[] = [
  {
    key: '0',
    name: 'heading',
    label: 'Заголовок',
    icon: <Heading1 className="w-4 h-4" />,
    component: (value, onChange) => (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введіть заголовок..."
        className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-0 placeholder:text-slate-300 h-auto"
      />
    ),
  },
  {
    key: '1',
    name: 'text',
    label: 'Текст',
    icon: <Type className="w-4 h-4" />,
    component: (value, onChange) => <TextField value={value} onChange={onChange} />,
  },
  {
    key: '2',
    name: 'image',
    label: 'Зображення',
    icon: <ImageIcon className="w-4 h-4" />,
    component: (_value, _onChange) => (
      <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
        <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-6 h-6 text-blue-500" />
        </div>
        <p className="font-medium text-slate-700">Натисніть, щоб завантажити зображення</p>
        <p className="text-sm mt-1">SVG, PNG, JPG або GIF (макс. 5MB)</p>
      </div>
    ),
  },
  {
    key: '3',
    name: 'quote',
    label: 'Цитата',
    icon: <Quote className="w-4 h-4" />,
    component: (value, onChange) => <TextField value={value} onChange={onChange} variant="quote" />,
  },
  {
    key: '4',
    name: 'video',
    label: 'Відео',
    icon: <Video className="w-4 h-4" />,
    component: (value, onChange) => {
      const getEmbedUrl = (url: string) => {
        try {
          const u = new URL(url);
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
      };
      const embedUrl = value ? getEmbedUrl(value) : null;
      return (
        <div className="space-y-3">
          <div className="w-full bg-slate-100 rounded-xl p-3 flex items-center gap-3 border border-slate-200">
            <div className="bg-red-100 text-red-600 p-2 rounded-lg shrink-0">
              <Video className="w-4 h-4" />
            </div>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Вставте посилання на YouTube або Vimeo..."
              className="bg-white border-none shadow-sm flex-1"
            />
          </div>
          {embedUrl && (
            <div className="aspect-video rounded-xl overflow-hidden border border-slate-200">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      );
    },
  },
  {
    key: '5',
    name: 'code',
    label: 'Код',
    icon: <Code className="w-4 h-4" />,
    component: (value, onChange) => <TextField value={value} onChange={onChange} variant="code" />,
  },
  {
    key: '6',
    name: 'warning',
    label: 'Увага',
    icon: <AlertCircle className="w-4 h-4" />,
    component: (value, onChange) => (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Текст важливого зауваження..."
          className="resize-none border-none shadow-none focus-visible:ring-0 p-0 bg-transparent text-amber-900 placeholder:text-amber-700/50 min-h-[60px]"
        />
      </div>
    ),
  },
  {
    key: '7',
    name: 'carousel',
    label: 'Карусель',

    icon: <GalleryHorizontal className="w-4 h-4" />,
    component: (_value, _onChange) => (
      <div className="relative px-10">
        <Carousel>
          <CarouselContent>
            {[1, 2, 3].map((i) => (
              <CarouselItem key={i}>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 min-h-40 hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Слайд {i}</p>
                  <p className="text-xs mt-1 text-slate-400">Натисніть для завантаження</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    ),
  },
  {
    key: '8',
    name: 'divider',
    label: 'Розділювач',
    icon: <Minus className="w-4 h-4" />,
    component: (_value, _onChange) => (
      <div className="flex items-center gap-3 py-2">
        <div className="flex-1 h-px bg-slate-200" />
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
    ),
  },
  {
    key: '9',
    name: 'list',
    label: 'Список',
    icon: <List className="w-4 h-4" />,
    component: (value, onChange) => {
      const items = value ? value.split('\n') : ['', '', ''];
      const updateItem = (index: number, v: string) => {
        const next = [0, 1, 2].map((i) => (i === index ? v : (items[i] ?? '')));
        onChange(next.join('\n'));
      };
      return (
        <div className="space-y-1 pl-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <Input
                value={items[i] ?? ''}
                onChange={(e) => updateItem(i, e.target.value)}
                placeholder={`Пункт списку ${i + 1}...`}
                className="border-none shadow-none focus-visible:ring-0 px-0 text-slate-700 placeholder:text-slate-300 h-8"
              />
            </div>
          ))}
        </div>
      );
    },
  },
];
