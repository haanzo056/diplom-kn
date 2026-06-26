import { TooltipProvider } from '@/components/ui/tooltip';
import { I18nProvider } from '@/providers/I18nProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
});
export const metadata: Metadata = {
  title: {
    default: "Фаховий Коледж Зв'язку та Інформатизації",
    template: '%s | ФКЗІ',
  },
  description:
    "Офіційний сайт Фахового Коледжу Зв'язку та Інформатизації — освіта, новини, спеціальності та вступ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="bottom-right" richColors />
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
