import { NavLink, Outlet } from 'react-router-dom';
import {
  FileText,
  FolderInput,
  GraduationCap,
  History,
  LayoutDashboard,
  Library,
  ListChecks,
  Newspaper,
  Settings,
  ShieldCheck,
  Users,
  Building2,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AdminNavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ADMIN_ITEMS: AdminNavItem[] = [
  { to: '/admin', label: 'Vue générale', icon: LayoutDashboard },
  { to: '/admin/concours', label: 'Concours', icon: GraduationCap },
  { to: '/admin/ministeres', label: 'Ministères', icon: Building2 },
  { to: '/admin/matieres', label: 'Matières', icon: BookOpen },
  { to: '/admin/cours', label: 'Cours', icon: FileText },
  { to: '/admin/questions', label: 'Questions', icon: ListChecks },
  { to: '/admin/examens', label: 'Examens', icon: FileText },
  { to: '/admin/documents', label: 'Documents', icon: Library },
  { to: '/admin/actualites', label: 'Actualités', icon: Newspaper },
  { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
  { to: '/admin/import-export', label: 'Import / Export', icon: FolderInput },
  { to: '/admin/historique', label: 'Historique', icon: History },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

/**
 * Layout de l'espace administrateur : visuellement distinct de l'espace candidat
 * (fond sombre permanent, bandeau d'identité dédié).
 * L'accès est protégé par le guard `RequireAdmin` côté routes — sans jamais
 * remplacer les contrôles serveur (RLS) qui restent la seule autorité.
 */
export function AdminLayout() {
  return (
    <div className="min-h-dvh bg-navy-950 text-offwhite">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-navy-700 bg-navy-900 md:flex">
        <div className="flex items-center gap-3 px-5 py-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-500 text-white">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-black tracking-wide text-white">Administration</p>
            <p className="text-[11px] font-medium uppercase tracking-widest text-cyan-neon">DAMS Concours</p>
          </div>
        </div>
        <nav aria-label="Espace administrateur" className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {ADMIN_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-electric-500/15 text-white' : 'text-grayblue-400 hover:bg-navy-800 hover:text-white',
                )
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/dashboard"
          className="border-t border-navy-700 px-5 py-4 text-[11px] font-semibold text-grayblue-400 hover:text-white"
        >
          ← Retour à l’espace candidat
        </Link>
      </aside>

      {/* Barre latérale repliée : navigation horizontale sur mobile */}
      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-navy-700 bg-navy-900 px-4 py-3 md:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric-500 text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-sm font-black">Administration</span>
          </div>
          <Link to="/dashboard" className="text-xs font-semibold text-cyan-neon">
            Espace candidat
          </Link>
        </header>
        <nav aria-label="Espace administrateur (mobile)" className="flex gap-1 overflow-x-auto border-b border-navy-700 bg-navy-900 px-3 py-2 md:hidden">
          {ADMIN_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                cn(
                  'shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-semibold',
                  isActive ? 'bg-electric-500/15 text-cyan-neon' : 'text-grayblue-400',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-4 md:pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
