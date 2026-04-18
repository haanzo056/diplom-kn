import { HomePage } from '@/feature/public/home';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Главная' };

export default function Page() {
  return <HomePage />;
}
