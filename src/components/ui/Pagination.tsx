import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/** Pagination accessible : boutons désactivés aux bornes, page courante annoncée. */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;
  return (
    <nav aria-label="Pagination" className={cn('flex items-center justify-center gap-2', className)}>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Page précédente"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 disabled:opacity-40 dark:bg-navy-800 dark:text-offwhite"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="text-xs font-semibold text-muted" aria-current="page">
        Page {page} sur {pageCount}
      </span>
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Page suivante"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 disabled:opacity-40 dark:bg-navy-800 dark:text-offwhite"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
