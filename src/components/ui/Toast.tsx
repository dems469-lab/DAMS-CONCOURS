import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastTone = 'success' | 'danger' | 'info';

interface ToastItem {
  id: number;
  tone: ToastTone;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TONES: Record<ToastTone, string> = {
  success: 'text-success',
  danger: 'text-danger',
  info: 'text-electric-500 dark:text-cyan-neon',
};

const ICONS: Record<ToastTone, typeof Info> = {
  success: CheckCircle2,
  danger: XCircle,
  info: Info,
};

let nextId = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, tone: ToastTone = 'info') => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, tone, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex flex-col items-center gap-2 px-4 md:bottom-6"
      >
        {toasts.map(({ id, tone, message }) => {
          const Icon = ICONS[tone];
          return (
            <div
              key={id}
              className="surface pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-xl border border-transparent px-4 py-3 shadow-card-dark sm:border-slate-200 dark:border-navy-600"
            >
              <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', TONES[tone])} />
              <p className="flex-1 text-xs leading-relaxed">{message}</p>
              <button
                type="button"
                aria-label="Fermer la notification"
                onClick={() => dismiss(id)}
                className="text-muted hover:text-slate-900 dark:hover:text-offwhite"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast doit être utilisé dans <ToastProvider>');
  return ctx;
}
