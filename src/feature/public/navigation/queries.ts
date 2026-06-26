import { cache } from 'react';
import { prisma } from '@/lib/prisma';

export type NavLink = { id: string; label: string; href: string };
export type NavGroup = NavLink & { children: NavLink[] };

export const getNavigation = cache(async (): Promise<NavGroup[]> => {
  const items = await prisma.navigationItem.findMany({ orderBy: { order: 'asc' } });

  return items
    .filter((item) => !item.parentId)
    .map((group) => ({
      id: group.id,
      label: group.label,
      href: group.href,
      children: items
        .filter((item) => item.parentId === group.id)
        .map((link) => ({ id: link.id, label: link.label, href: link.href })),
    }));
});
