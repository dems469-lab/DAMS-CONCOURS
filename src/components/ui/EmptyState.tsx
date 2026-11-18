import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

/** État vide standardisé — jamais de faux contenu dans un état vide. */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3 py-10 text-center', className)}>
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-500/10 text-electric-500 dark:bg-cyan-neon/10 dark:text-cyan-neon">
        <Icon className="h-7 w-7" />
      </span>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
