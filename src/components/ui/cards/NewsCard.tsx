import { ArrowRight, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../badge';
import { Button } from '../button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card';

export const NewsCard = ({ news, className }: { news: any; className?: string }) => {
  return (
    <Card className={`flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200 p-0 ${className ?? ''}`}>
      <div className="relative w-full h-56 shrink-0 bg-slate-100">
        {news.image ? (
          <Image src={news.image} alt={news.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-200" />
        )}
        {news.category && (
          <div className="absolute top-3 left-3">
            <Badge variant={(news.variant as any) || 'default'} className="text-sm px-3 py-1">
              {news.category}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center text-sm text-slate-500 mb-2 gap-1.5">
          <CalendarDays className="w-4 h-4" />
          {news.date}
        </div>
        <CardTitle className="text-xl leading-snug">{news.title}</CardTitle>
      </CardHeader>

      <CardContent className="grow text-slate-600 text-sm line-clamp-3">{news.excerpt}</CardContent>

      <CardFooter>
        <Button
          variant="ghost"
          className="p-0 h-auto text-primary hover:bg-transparent hover:text-primary/80 group font-medium"
        >
          Детальніше
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
