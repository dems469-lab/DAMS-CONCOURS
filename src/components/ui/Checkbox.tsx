import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, className, id, ...props },
  ref,
) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <label
        htmlFor={inputId}
        className={cn(
          'flex cursor-pointer items-start gap-2.5 text-sm',
          props.disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-invalid={Boolean(error)}
          className={cn(
            'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-electric-500 accent-electric-500 dark:border-navy-600 dark:bg-navy-800',
            className,
          )}
          {...props}
        />
        <span className="leading-snug">{label}</span>
      </label>
      {error && (
        <p className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
