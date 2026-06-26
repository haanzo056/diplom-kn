import { ContactsPage } from '@/feature/public/foreigners/contacts';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact information' };

export default function Page() {
  return <ContactsPage />;
}
