import { cn } from '@/lib/utils';

export interface TableColumn<T> {
  key: string;
  header: string;
  /** Rendu de la cellule ; défaut : valeur du champ `key` */
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  /** Libellé affiché quand aucune ligne */
  emptyLabel?: string;
  className?: string;
}

/** Tableau responsive : défilement horizontal contenu, jamais de débordement de page. */
export function Table<T extends { id: string }>({ columns, rows, emptyLabel = 'Aucune donnée', className }: TableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="surface surface-border rounded-2xl border px-5 py-8 text-center text-xs text-muted">
        {emptyLabel}
      </div>
    );
  }
  return (
    <div className={cn('surface surface-border overflow-x-auto rounded-2xl border shadow-card', className)}>
      <table className="w-full min-w-max text-left text-xs">
        <thead>
          <tr className="border-b border-slate-200 dark:border-navy-600">
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn('px-4 py-3 font-bold uppercase tracking-wide text-muted', c.className)}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 last:border-0 dark:border-navy-700">
              {columns.map((c) => (
                <td key={c.key} className={cn('px-4 py-3', c.className)}>
                  {c.render ? c.render(row) : (row as Record<string, unknown>)[c.key] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
