import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  label: string;
}

/** Menu déroulant fermable au clic extérieur et avec la touche Échap. */
export function Dropdown({ trigger, children, align = 'right', label }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1"
      >
        {trigger}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            'surface absolute bottom-full z-40 mt-2 min-w-48 animate-fade-in overflow-hidden rounded-xl border shadow-card-dark sm:bottom-auto',
            align === 'right' ? 'right-0' : 'left-0',
            'border-transparent sm:border-slate-200 dark:border-navy-600',
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownItemProps extends React.ComponentProps<typeof Link> {
  to: string;
}

export function DropdownItem({ to, className, children, ...props }: DropdownItemProps) {
  return (
    <Link to={to} role="menuitem" className={cn('block px-4 py-2.5 text-xs font-medium text-muted hover:bg-slate-100 dark:hover:bg-navy-700', className)} {...props}>
      {children}
    </Link>
  );
}
