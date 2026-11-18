import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  label?: string;
  /** Plein écran quand utilisé comme écran de chargement de route */
  fullPage?: boolean;
  className?: string;
}

export function LoadingState({ label = 'Chargement…', fullPage = false, className }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        fullPage ? 'min-h-[60vh]' : 'py-10',
        className,
      )}
    >
      <Loader2 className="h-7 w-7 animate-spin text-electric-500 dark:text-cyan-neon" />
      <p className="text-xs font-medium text-muted">{label}</p>
    </div>
  );
}
