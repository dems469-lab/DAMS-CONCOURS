import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

/** Barre de recherche standardisée (utilisée par les listes et les catalogues). */
export function SearchBar({ label = 'Rechercher', className, ...props }: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grayblue-400" />
      <input
        type="search"
        aria-label={label}
        className="input-base pl-10 pr-4"
        {...props}
      />
    </div>
  );
}
