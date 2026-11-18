import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  /** Valeur affichée ; `null` = aucune donnée réelle disponible */
  value: number | string | null;
  icon: React.ReactNode;
  hint?: string;
  className?: string;
}

/**
 * Carte de statistique. Règle absolue : si aucune donnée réelle n'est disponible,
 * `value` est null et la carte affiche un état vide explicite — jamais de valeur inventée.
 */
export function StatCard({ label, value, icon, hint, className }: StatCardProps) {
  const empty = value === null || value === undefined;
  return (
    <div
      className={cn(
        'surface surface-border flex items-center gap-4 rounded-2xl border p-4 shadow-card',
        className,
      )}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-500 dark:bg-cyan-soft dark:text-cyan-neon">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
        {empty ? (
          <>
            <p className="text-lg font-black text-grayblue-400">—</p>
            <p className="text-[11px] text-muted">{hint ?? 'Aucune donnée pour l’instant'}</p>
          </>
        ) : (
          <p className="truncate text-xl font-black">{value}</p>
        )}
      </div>
    </div>
  );
}
