import { cn } from '@/lib/utils';

/**
 * Skeleton de chargement — à utiliser à la place des spinners bloquants
 * pour les contenus asynchrones (états de chargement, règle PROMPT 02).
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'animate-pulse rounded-xl bg-neutral-100 dark:bg-navy-600',
        className,
      )}
    />
  );
}
