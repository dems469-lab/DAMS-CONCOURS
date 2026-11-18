import { cn } from '@/lib/utils';

type BadgeTone = 'default' | 'success' | 'danger' | 'info' | 'warning';

const TONES: Record<BadgeTone, string> = {
  default: 'bg-neutral-100 text-neutral-700 dark:bg-navy-600 dark:text-neutral-300',
  success: 'bg-success-soft text-success',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-electric-500/10 text-electric-500 dark:bg-cyan-neon/10 dark:text-cyan-neon',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
};

export function Badge({
  tone = 'default',
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
