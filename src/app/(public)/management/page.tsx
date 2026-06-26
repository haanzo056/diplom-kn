import { ManagementPage } from '@/feature/public/management';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Керівництво' };

export default function Page() {
  return <ManagementPage />;
}
