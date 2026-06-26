import { SpecialtiesIndexPage } from '@/feature/public/specialties/SpecialtiesIndexPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Спеціальності',
};

export default function Page() {
  return <SpecialtiesIndexPage />;
}
