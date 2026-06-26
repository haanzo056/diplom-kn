import Image from 'next/image';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Newspaper, BookOpen, ScrollText, Compass, Images, SlidersHorizontal, LogOut } from 'lucide-react';
import { logout } from '@/app/actions/auth';

const navLinks = [
  { href: '/admin', label: 'Дашборд', icon: LayoutDashboard },
  { href: '/admin/news', label: 'Новини', icon: Newspaper },
  { href: '/admin/pages', label: 'Сторінки', icon: BookOpen },
  { href: '/admin/posts', label: 'Пости', icon: ScrollText },
  { href: '/admin/navigation', label: 'Навігація', icon: Compass },
  { href: '/admin/media', label: 'Медіатека', icon: Images },
  { href: '/admin/settings', label: 'Налаштування', icon: SlidersHorizontal },
];

function AdminSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="**:text-slate-100 **:fill-slate-100"
      style={
        {
          '--sidebar': '#0f172a',
          '--sidebar-foreground': '#f1f5f9',
          '--sidebar-accent': '#1e293b',
          '--sidebar-accent-foreground': '#f1f5f9',
          '--sidebar-border': '#1e293b',
          '--sidebar-ring': '#334155',
          '--sidebar-muted-foreground': '#94a3b8',
        } as React.CSSProperties
      }
    >
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-3">
          <Image src="/logo_w.png" alt="Логотип" width={32} height={32} className="shrink-0" />
          <span className="font-bold text-sm whitespace-nowrap group-data-[collapsible=icon]:hidden">
            Адмін-панель
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Меню</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton size="lg" className="group-data-[collapsible=icon]:justify-center" render={<Link href={link.href} />}>
                    <link.icon className="size-5 shrink-0" />
                    <span className="text-base group-data-[collapsible=icon]:hidden">{link.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-2">
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-100 transition-colors">
            На сайт →
          </Link>
        </div>
        <div className="flex items-center gap-3 px-3 py-3 border-t border-slate-700">
          <div className="size-8 rounded-full bg-slate-600 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-slate-100">А</span>
          </div>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden flex-1">
            <span className="text-sm font-medium text-slate-100 truncate">Адміністратор</span>
          </div>
          <form action={logout}>
            <button type="submit" className="text-slate-400 hover:text-slate-100 transition-colors group-data-[collapsible=icon]:hidden" title="Вийти">
              <LogOut className="size-4" />
            </button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <SidebarTrigger />
          <span className="text-sm text-gray-500">Керування сайтом</span>
        </header>
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </SidebarProvider>
  );
}
