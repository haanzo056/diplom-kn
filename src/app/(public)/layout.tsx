import { PublicHeader } from '@/components/layouts/public-header';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-900 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p>© {new Date().getFullYear()} ВСП «ФКЗІ ГУІТС». Усі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
