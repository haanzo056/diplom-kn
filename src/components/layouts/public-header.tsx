'use client';

import type { NavGroup } from '@/feature/public/navigation/queries';
import { Mail, MapPin, Menu, Phone, Send, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);

const NAV_LINKS = [
  { label: 'Новини', href: '/news' },
  { label: 'Студенту', href: '/student' },
  { label: 'Керівництво', href: '/management' },
  { label: 'For foreigners', href: '/foreigners' },
];

const SOCIAL_LINKS = [
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Send, href: 'https://t.me', label: 'Telegram' },
  { icon: Phone, href: 'tel:+380', label: 'Phone' },
  { icon: Mail, href: 'mailto:info@fkzi.edu.ua', label: 'Email' },
  { icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' },
];

interface PublicHeaderProps {
  navigation: NavGroup[];
}

const fadeStyle = (index: number, base = 0.1, step = 0.06) => ({
  opacity: 0,
  transform: 'translateY(16px)',
  transition: `opacity 0.4s ease ${base + index * step}s, transform 0.4s ease ${base + index * step}s`,
});

const fadeStyleVisible = (index: number, base = 0.1, step = 0.06) => ({
  opacity: 1,
  transform: 'translateY(0)',
  transition: `opacity 0.4s ease ${base + index * step}s, transform 0.4s ease ${base + index * step}s`,
});

const buildNavColumns = (navigation: NavGroup[], columnCount = 4): NavGroup[][] => {
  const columns: NavGroup[][] = Array.from({ length: columnCount }, () => []);
  const extra = Math.max(navigation.length - columnCount, 0);

  columns[0] = navigation.slice(0, extra + 1);
  for (let c = 1; c < columnCount; c++) {
    columns[c] = navigation.slice(extra + c, extra + c + 1);
  }

  return columns.filter((col) => col.length > 0);
};

export const PublicHeader = ({ navigation }: PublicHeaderProps) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const navColumns = buildNavColumns(navigation);

  const openMenu = () => {
    setOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  const closeMenu = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 350);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/logo_b.png" alt="ФКЗІ" width={52} height={52} className="object-contain" />
            <span className="text-sm font-semibold text-slate-800 leading-snug">
              Фаховий Коледж
              <br />
              Зв&apos;язку та Інформатизації
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:opacity-70"
                style={{ color: 'rgba(0,0,0,0.80)', fontFamily: 'var(--font-montserrat)', fontSize: '20px', fontWeight: 500, lineHeight: '150%', letterSpacing: '-0.38px' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={openMenu}
            aria-label="Відкрити меню"
            className="w-10 h-10 rounded-full bg-[#3D5AF1] flex items-center justify-center text-white hover:bg-[#2d4ae0] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-100 overflow-y-auto"
          style={{
            background: 'white',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-12px)',
            transition:
              'opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16 border-b border-slate-100">
              <Link href="/" onClick={closeMenu} className="flex items-center gap-3 shrink-0">
                <Image
                  src="/logo_b.png"
                  alt="ФКЗІ"
                  width={52}
                  height={52}
                  className="object-contain"
                />
                <span className="text-sm font-semibold text-slate-800 leading-snug">
                  Фаховий Коледж
                  <br />
                  Зв&apos;язку та Інформатизації
                </span>
              </Link>

              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-2">
                  {SOCIAL_LINKS.map(({ icon: Icon, href, label }, i) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#3D5AF1] flex items-center justify-center text-white hover:bg-[#2d4ae0] transition-colors"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
                        transition: `opacity 0.3s ease ${0.1 + i * 0.05}s, transform 0.3s ease ${0.1 + i * 0.05}s`,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>

                <a
                  href="https://maps.app.goo.gl/BiAs9jUShEjE6rCS8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#3D5AF1] transition-colors underline-offset-2 hover:underline"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.35s ease 0.2s',
                  }}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  м. Одеса, просп. Українських Героїв, 6
                </a>

                <button
                  onClick={closeMenu}
                  aria-label="Закрити меню"
                  className="w-10 h-10 rounded-full bg-[#3D5AF1] flex items-center justify-center text-white hover:bg-[#2d4ae0] transition-colors"
                >
                  <X
                    className="w-5 h-5"
                    style={{
                      transform: visible ? 'rotate(0deg)' : 'rotate(-90deg)',
                      transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  />
                </button>
              </div>
            </div>

            {/* ── Mobile nav (< md) ── */}
            <div className="md:hidden flex flex-col py-6 gap-1">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-4 border-b border-slate-100 text-lg font-medium text-slate-800 hover:text-[#3D5AF1] transition-colors"
                  style={visible ? fadeStyleVisible(i, 0.05, 0.07) : fadeStyle(i, 0.05, 0.07)}
                >
                  {link.label}
                </Link>
              ))}

              {navigation.map((group, gi) => (
                <div key={group.id} className="py-4 border-b border-slate-100"
                  style={visible ? fadeStyleVisible(NAV_LINKS.length + gi, 0.05, 0.07) : fadeStyle(NAV_LINKS.length + gi, 0.05, 0.07)}
                >
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{group.label}</p>
                  <ul className="flex flex-col gap-2">
                    {group.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={child.href}
                          onClick={closeMenu}
                          className="text-[17px] text-slate-600 hover:text-[#3D5AF1] transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div
                className="pt-6 flex flex-col gap-4"
                style={visible ? fadeStyleVisible(NAV_LINKS.length + navigation.length, 0.05, 0.07) : fadeStyle(NAV_LINKS.length + navigation.length, 0.05, 0.07)}
              >
                <Link
                  href="/contacts"
                  onClick={closeMenu}
                  className="font-bold text-[#3D5AF1] text-lg"
                >
                  Контакти
                </Link>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#3D5AF1] flex items-center justify-center text-white hover:bg-[#2d4ae0] transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <a
                  href="https://maps.app.goo.gl/BiAs9jUShEjE6rCS8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-slate-500"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#3D5AF1]" />
                  м. Одеса, просп. Українських Героїв, 6
                </a>
              </div>
            </div>

            {/* ── Desktop nav (≥ md) ── */}
            <div className="hidden md:grid grid-cols-4 divide-x divide-slate-200 py-10">
              {navColumns.map((colGroups, colIndex) => {
                const isFirst = colIndex === 0;
                const isLast = colIndex === navColumns.length - 1;
                const paddingClass = isFirst ? 'pr-8' : isLast ? 'pl-8' : 'px-8';
                const baseIndex = navColumns
                  .slice(0, colIndex)
                  .reduce((sum, c) => sum + c.length, 0);

                return (
                  <div
                    key={colIndex}
                    className={`${paddingClass} flex flex-col ${isLast ? 'justify-between' : ''}`}
                  >
                    <div className="flex flex-col gap-10">
                      {colGroups.map((group, gi) => (
                        <div
                          key={group.id}
                          style={
                            visible ? fadeStyleVisible(baseIndex + gi) : fadeStyle(baseIndex + gi)
                          }
                        >
                          <h3 className="font-bold text-slate-900 mb-5 text-xl">{group.label}</h3>
                          <ul className="space-y-4">
                            {group.children.map((link) => (
                              <li key={link.id}>
                                <Link
                                  href={link.href}
                                  onClick={closeMenu}
                                  className="relative inline-block text-[20px] text-slate-500 leading-snug transition-colors duration-200 hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#3D5AF1] after:transition-all after:duration-300 hover:after:w-full"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {isLast && (
                      <Link
                        href="/contacts"
                        onClick={closeMenu}
                        className="font-bold text-[#3D5AF1] text-xl hover:text-[#2d4ae0] transition-colors mt-6 inline-block"
                        style={
                          visible
                            ? fadeStyleVisible(navigation.length)
                            : fadeStyle(navigation.length)
                        }
                      >
                        Контакти
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
