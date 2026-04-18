'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

const NavDropdown = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors outline-none">
      {label}
      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>{children}</DropdownMenuContent>
  </DropdownMenu>
);

export const PublicHeader = () => {
  const { t } = useTranslation();

  const specialties = [
    { title: t('specialties.security'), href: '/specialties/security' },
    { title: t('specialties.software'), href: '/specialties/software' },
    { title: t('specialties.hardware'), href: '/specialties/hardware' },
    { title: t('specialties.networks'), href: '/specialties/networks' },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-lg font-bold text-primary shrink-0">
          ВСП «ФКЗІ ГУІТС»
        </Link>

        <nav className="flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/">{t('nav.home')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavDropdown label={t('nav.about')}>
            <DropdownMenuItem asChild>
              <Link href="/about">{t('nav.aboutCollege')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/about/management">{t('nav.management')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/about/teachers">{t('nav.teachers')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/about/facilities">{t('nav.facilities')}</Link>
            </DropdownMenuItem>
          </NavDropdown>

          <NavDropdown label={t('nav.admission')}>
            <DropdownMenuItem asChild>
              <Link href="/admission">{t('nav.admissionConditions')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admission/docs">{t('nav.documents')}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>{t('nav.specialties')}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {specialties.map((s) => (
                  <DropdownMenuItem key={s.href} asChild>
                    <Link href={s.href}>{s.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </NavDropdown>

          <NavDropdown label={t('nav.news')}>
            <DropdownMenuItem asChild>
              <Link href="/news">{t('nav.allNews')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/news?category=achievements">{t('nav.achievements')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/news?category=events">{t('nav.events')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/news?category=esports">{t('nav.esports')}</Link>
            </DropdownMenuItem>
          </NavDropdown>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/contacts">{t('nav.contacts')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/admin">Admin</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
  );
};
