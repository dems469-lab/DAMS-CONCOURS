import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, className, id, ...props },
  ref,
) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </label>
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        rows={4}
        className={cn('input-base resize-y', error && 'border-danger focus:border-danger focus:ring-danger/30', className)}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="flex items-center gap-1 text-xs text-danger" role="alert">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
});
