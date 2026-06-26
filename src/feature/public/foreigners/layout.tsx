'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SECTIONS = [
  { label: 'About us', href: '/foreigners/about' },
  { label: 'Admission rules', href: '/foreigners/admission' },
  { label: 'Faculties and specialties', href: '/foreigners/faculties' },
  { label: 'Contact information', href: '/foreigners/contacts' },
];

export const ForeignersLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <div className="bg-[#3D5AF1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto">
            {SECTIONS.map((s) => {
              const active = pathname === s.href;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    active
                      ? 'border-white text-white'
                      : 'border-transparent text-white/70 hover:text-white hover:border-white/50'
                  }`}
                >
                  {s.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">{children}</div>
    </div>
  );
};
