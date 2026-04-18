import { Dashboard } from '@/feature/admin/dashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard | Admin' };

export default function Page() {
  return <Dashboard />;
}
