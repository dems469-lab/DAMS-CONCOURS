import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  /** Contenu du panneau de l'onglet */
  content: React.ReactNode;
}

/** Onglets accessibles (rôles tablist/tab/tabpanel, navigation clavier). */
export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const activeItem = items.find((i) => i.id === active) ?? items[0];

  return (
    <div className={className}>
      <div role="tablist" aria-label="Sections" className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 dark:bg-navy-800">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={item.id === activeItem?.id}
            onClick={() => setActive(item.id)}
            className={cn(
              'shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition-colors',
              item.id === activeItem?.id
                ? 'bg-white text-electric-500 shadow-card dark:bg-navy-600 dark:text-cyan-neon'
                : 'text-muted hover:text-slate-900 dark:hover:text-offwhite',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-4 animate-fade-in">
        {activeItem?.content}
      </div>
    </div>
  );
}
