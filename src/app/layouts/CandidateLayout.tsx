import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  BookOpen,
  CalendarClock,
  ClipboardList,
  FileText,
  GraduationCap,
  Home,
  Layers,
  Library,
  ListChecks,
  Moon,
  Sun,
  User,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useOnline } from '@/hooks/useOnline';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { cn } from '@/lib/utils';
import { BRAND } from '@/lib/brand';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

/** Navigation inférieure mobile : 5 accès principaux. */
const BOTTOM_ITEMS: NavItem[] = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/concours', label: 'Concours', icon: GraduationCap },
  { to: '/entrainement', label: 'Réviser', icon: ListChecks },
  { to: '/resultats', label: 'Résultats', icon: ClipboardList },
  { to: '/profil', label: 'Profil', icon: User },
];

/** Menu secondaire (mobile) : fonctionnalités supplémentaires. */
const MORE_ITEMS: NavItem[] = [
  { to: '/matieres', label: 'Matières', icon: BookOpen },
  { to: '/cours', label: 'Cours', icon: FileText },
  { to: '/bibliotheque', label: 'Bibliothèque', icon: Library },
  { to: '/examens', label: 'Examens blancs', icon: ClipboardList },
  { to: '/planning', label: 'Planning', icon: CalendarClock },
];

/** Navigation latérale (ordinateur) : espace candidat complet. */
const SIDEBAR_ITEMS: NavItem[] = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/dashboard', label: 'Tableau de bord', icon: Layers },
  { to: '/concours', label: 'Concours', icon: GraduationCap },
  { to: '/matieres', label: 'Matières', icon: BookOpen },
  { to: '/cours', label: 'Cours', icon: FileText },
  { to: '/bibliotheque', label: 'Bibliothèque', icon: Library },
  { to: '/entrainement', label: 'Entraînement', icon: ListChecks },
  { to: '/examens', label: 'Examens blancs', icon: ClipboardList },
  { to: '/planning', label: 'Planning', icon: CalendarClock },
  { to: '/resultats', label: 'Mes résultats', icon: ClipboardList },
  { to: '/profil', label: 'Mon profil', icon: User },
];

export function CandidateLayout() {
  return (
    <div className="min-h-dvh">
      <SidebarDesktop items={SIDEBAR_ITEMS} />
      <div className="md:pl-60">
        <CandidateTopBar />
        <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-4 md:pb-10 md:pt-8">
          <Outlet />
        </main>
      </div>
      <BottomNavigation items={BOTTOM_ITEMS} />
    </div>
  );
}

function SidebarDesktop({ items }: { items: NavItem[] }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-navy-700 bg-navy-950 md:flex">
      <div className="flex items-center gap-3 px-5 py-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-500 text-white">
          <GraduationCap className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm font-black tracking-wide text-white">DAMS</p>
          <p className="text-[11px] font-medium uppercase tracking-widest text-cyan-neon">Concours</p>
        </div>
      </div>
      <nav aria-label="Espace candidat" className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-electric-500/15 text-white'
                  : 'text-grayblue-400 hover:bg-navy-800 hover:text-white',
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>
      <p className="border-t border-navy-700 px-5 py-4 text-[11px] leading-relaxed text-grayblue-600">
        {BRAND.slogan}
      </p>
    </aside>
  );
}

function CandidateTopBar() {
  const { theme, toggleTheme } = useTheme();
  const online = useOnline();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200 bg-offwhite/90 px-4 py-3 backdrop-blur md:hidden dark:border-navy-600 dark:bg-navy-950/90">
      <Link to="/" className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric-500 text-white">
          <GraduationCap className="h-5 w-5" />
        </span>
        <span className="text-sm font-black tracking-wide">DAMS CONCOURS</span>
      </Link>
      <div className="flex items-center gap-2">
        <span
          title={online ? 'En ligne' : 'Hors connexion'}
          className={cn('flex h-8 w-8 items-center justify-center rounded-full', online ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger')}
          aria-hidden
        >
          {online ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        </span>
        <Dropdown label="Fonctionnalités supplémentaires" trigger={<span className="flex h-8 items-center rounded-full bg-slate-100 px-3 text-xs font-bold text-slate-700 dark:bg-navy-800 dark:text-offwhite">Plus</span>}>
          {MORE_ITEMS.map(({ to, label }) => (
            <DropdownItem key={to} to={to}>
              {label}
            </DropdownItem>
          ))}
        </Dropdown>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-navy-800 dark:text-cyan-neon"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}

function BottomNavigation({ items }: { items: NavItem[] }) {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-offwhite/95 backdrop-blur md:hidden dark:border-navy-600 dark:bg-navy-950/95"
    >
      <ul className="flex">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors',
                  isActive ? 'text-electric-500 dark:text-cyan-neon' : 'text-grayblue-400',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className={cn('flex h-7 w-12 items-center justify-center rounded-full', isActive && 'bg-electric-500/10 dark:bg-cyan-soft')}>
                    <Icon className="h-5 w-5" />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
