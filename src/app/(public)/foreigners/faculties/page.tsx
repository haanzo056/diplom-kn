import { FacultiesPage } from '@/feature/public/foreigners/faculties';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Faculties and specialties' };

export default function Page() {
  return <FacultiesPage />;
}
