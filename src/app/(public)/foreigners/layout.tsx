import { ForeignersLayout } from '@/feature/public/foreigners/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ForeignersLayout>{children}</ForeignersLayout>;
}
