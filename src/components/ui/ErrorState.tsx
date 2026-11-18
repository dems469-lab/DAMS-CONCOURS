import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  description: string;
  /** Si fourni : affiche un bouton « Réessayer » actif */
  onRetry?: () => void;
  className?: string;
}

/** État d'erreur standardisé avec action de réessai. */
export function ErrorState({ title = 'Une erreur est survenue', description, onRetry, className }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center gap-3 rounded-2xl border border-danger/30 bg-danger-soft px-5 py-8 text-center',
        className,
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger/15 text-danger">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <div>
        <p className="text-sm font-bold text-danger">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-muted">{description}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCw className="h-3.5 w-3.5" />
          Réessayer
        </Button>
      )}
    </div>
  );
}
