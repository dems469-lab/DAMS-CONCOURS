import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Petit dégradé futuriste sur le bord supérieur */
  glow?: boolean;
}

export function Card({ glow = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'surface surface-border relative overflow-hidden rounded-2xl border shadow-card',
        glow && 'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-neon before:to-transparent',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-b border-neutral-100 px-5 py-4 dark:border-navy-600">
      {icon && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-500 dark:bg-cyan-neon/10 dark:text-cyan-neon">
          {icon}
        </span>
      )}
      <div>
        <h2 className="text-sm font-bold">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      </div>
    </div>
  );
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 py-4', className)} {...props}>
      {children}
    </div>
  );
}
