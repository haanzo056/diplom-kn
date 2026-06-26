import { AboutPage } from '@/feature/public/foreigners/about';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About us' };

export default function Page() {
  return <AboutPage />;
}
