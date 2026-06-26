export const dynamic = 'force-dynamic';

import { PublicHeader } from '@/components/layouts/public-header';
import { getNavigation } from '@/feature/public/navigation/queries';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const navigation = await getNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader navigation={navigation} />

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-900 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p>© {new Date().getFullYear()} ФКЗІ ДУІТЗ. Усі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
