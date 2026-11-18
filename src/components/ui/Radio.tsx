import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, id, ...props },
  ref,
) {
  const inputId = id ?? `${props.name}-${props.value}`;
  return (
    <label
      htmlFor={inputId}
      className={cn(
        'flex cursor-pointer items-center gap-2.5 text-sm',
        props.disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className={cn('h-4 w-4 cursor-pointer accent-electric-500 dark:bg-navy-800', className)}
        {...props}
      />
      <span className="leading-snug">{label}</span>
    </label>
  );
});
