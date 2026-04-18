import { Button } from '@/src/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/components/ui/carousel';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
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
        placeholder="Введите заголовок..."
        className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-0 placeholder:text-slate-300 h-auto"
      />
    ),
  },
  {
    key: '1',
    name: 'text',
    label: 'Текст',
    icon: <Type className="w-4 h-4" />,
    component: (value, onChange) => (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Начните писать текст..."
        className="resize-none border-none shadow-none focus-visible:ring-0 px-0 text-lg text-slate-700 min-h-[100px]"
      />
    ),
  },
  {
    key: '2',
    name: 'image',
    label: 'Изображение',
    icon: <ImageIcon className="w-4 h-4" />,
    component: (_value, _onChange) => (
      <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
        <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-6 h-6 text-blue-500" />
        </div>
        <p className="font-medium text-slate-700">Нажмите, чтобы загрузить картинку</p>
        <p className="text-sm mt-1">SVG, PNG, JPG или GIF (макс. 5MB)</p>
      </div>
    ),
  },
  {
    key: '3',
    name: 'quote',
    label: 'Цитата',
    icon: <Quote className="w-4 h-4" />,
    component: (value, onChange) => (
      <div className="flex gap-4 border-l-4 border-blue-500 bg-slate-50 p-4 rounded-r-lg">
        <Quote className="w-6 h-6 text-blue-400 shrink-0 opacity-50" />
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Введите цитату..."
          className="resize-none border-none shadow-none focus-visible:ring-0 p-0 bg-transparent text-lg italic text-slate-700 placeholder:text-slate-400"
        />
      </div>
    ),
  },
  {
    key: '4',
    name: 'video',
    label: 'Видео',
    icon: <Video className="w-4 h-4" />,
    component: (value, onChange) => (
      <div className="w-full bg-slate-100 rounded-xl p-4 flex items-center gap-4 border border-slate-200">
        <div className="bg-red-100 text-red-600 p-2 rounded-lg">
          <Video className="w-5 h-5" />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Вставьте ссылку на YouTube или Vimeo..."
          className="bg-white border-none shadow-sm flex-1"
        />
        <Button variant="secondary">Добавить</Button>
      </div>
    ),
  },
  {
    key: '5',
    name: 'code',
    label: 'Код',
    icon: <Code className="w-4 h-4" />,
    component: (value, onChange) => (
      <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm relative">
        <div className="absolute top-3 right-3 text-slate-500 text-xs font-sans">JavaScript</div>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="console.log('Hello World');"
          className="resize-none border-none shadow-none focus-visible:ring-0 p-0 bg-transparent text-slate-50 placeholder:text-slate-600 min-h-[120px]"
        />
      </div>
    ),
  },
  {
    key: '6',
    name: 'warning',
    label: 'Внимание',
    icon: <AlertCircle className="w-4 h-4" />,
    component: (value, onChange) => (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Текст важного примечания..."
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
                  <p className="text-xs mt-1 text-slate-400">Нажмите для загрузки</p>
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
    label: 'Разделитель',
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
                placeholder={`Пункт списка ${i + 1}...`}
                className="border-none shadow-none focus-visible:ring-0 px-0 text-slate-700 placeholder:text-slate-300 h-8"
              />
            </div>
          ))}
        </div>
      );
    },
  },
];
