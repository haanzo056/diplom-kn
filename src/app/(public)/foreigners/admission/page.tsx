import { AdmissionRulesPage } from '@/feature/public/foreigners/admission';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admission rules' };

export default function Page() {
  return <AdmissionRulesPage />;
}
