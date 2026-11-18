import { Outlet } from 'react-router-dom';
import { GraduationCap, Moon, Sun } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useOnline } from '@/hooks/useOnline';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/lib/brand';
import { cn } from '@/lib/utils';

const PUBLIC_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/concours', label: 'Concours' },
  { to: '/fonctionnalites', label: 'Fonctionnalités' },
  { to: '/a-propos', label: 'À propos' },
] as const;

export function PublicLayout() {
  const { theme, toggleTheme } = useTheme();
  const online = useOnline();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-offwhite/90 backdrop-blur dark:border-navy-600 dark:bg-navy-950/90">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric-500 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-black tracking-wide">DAMS CONCOURS</span>
              <span className="hidden text-[10px] font-medium text-cyan-neon sm:block">
                {BRAND.slogan}
              </span>
            </span>
          </Link>

          <nav aria-label="Navigation publique" className="hidden items-center gap-1 md:flex">
            {PUBLIC_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-electric-500/10 text-electric-500 dark:bg-cyan-soft dark:text-cyan-neon'
                      : 'text-muted hover:bg-slate-100 dark:hover:bg-navy-800',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span
              title={online ? 'En ligne' : 'Hors connexion'}
              className={cn(
                'hidden h-2.5 w-2.5 rounded-full sm:block',
                online ? 'bg-success' : 'bg-danger',
              )}
              aria-hidden
            />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-navy-800 dark:text-cyan-neon dark:hover:bg-navy-700"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/auth/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button size="sm">Commencer gratuitement</Button>
            </Link>
          </div>
        </div>

        {/* Liens publics sur mobile */}
        <nav aria-label="Navigation publique (mobile)" className="flex gap-1 overflow-x-auto px-3 pb-2 md:hidden">
          {PUBLIC_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold',
                  isActive
                    ? 'bg-electric-500/10 text-electric-500 dark:bg-cyan-soft dark:text-cyan-neon'
                    : 'text-muted',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 dark:border-navy-600 dark:bg-navy-900">
      <div className="mx-auto grid w-full max-w-6xl gap-8 sm:grid-cols-3">
        <div>
          <p className="text-sm font-black">DAMS CONCOURS</p>
          <p className="mt-1 text-xs text-muted">{BRAND.slogan}</p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted">{BRAND.positioning}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider">Plateforme</p>
          <ul className="mt-2 space-y-1.5 text-xs text-muted">
            <li><Link className="hover:underline" to="/concours">Catalogue des concours</Link></li>
            <li><Link className="hover:underline" to="/fonctionnalites">Fonctionnalités</Link></li>
            <li><Link className="hover:underline" to="/a-propos">À propos</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider">Informations</p>
          <ul className="mt-2 space-y-1.5 text-xs text-muted">
            <li><Link className="hover:underline" to="/cgu">Conditions d’utilisation</Link></li>
            <li><Link className="hover:underline" to="/confidentialite">Politique de confidentialité</Link></li>
            <li><Link className="hover:underline" to="/auth/register">Créer un compte</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-slate-200 pt-4 text-[11px] leading-relaxed text-grayblue-400 dark:border-navy-700">
        100 % gratuite, sans abonnement ni publicité. Aucune donnée officielle n’est inventée :
        les fiches de concours ne contiennent que des informations vérifiées et sourcées, ou
        restent vides en attendant validation. © {new Date().getFullYear()} DAMS CONCOURS.
      </div>
    </footer>
  );
}
