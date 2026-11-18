import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertTone = 'info' | 'success' | 'warning' | 'danger';

const TONES: Record<AlertTone, { icon: LucideIcon; classes: string }> = {
  info: { icon: Info, classes: 'bg-electric-500/10 text-electric-500 dark:bg-cyan-soft dark:text-cyan-neon' },
  success: { icon: CheckCircle2, classes: 'bg-success-soft text-success' },
  warning: { icon: AlertTriangle, classes: 'bg-warning-soft text-warning' },
  danger: { icon: XCircle, classes: 'bg-danger-soft text-danger' },
};

interface AlertProps {
  tone?: AlertTone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ tone = 'info', title, children, className }: AlertProps) {
  const { icon: Icon, classes } = TONES[tone];
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex items-start gap-3 rounded-xl px-4 py-3', classes, className)}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="text-xs leading-relaxed">
        {title && <p className="font-bold">{title}</p>}
        {children}
      </div>
    </div>
  );
}
