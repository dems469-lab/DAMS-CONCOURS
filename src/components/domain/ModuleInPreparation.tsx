import type { LucideIcon } from 'lucide-react';
import { HardHat } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';

interface ModuleInPreparationProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  /** Ce qui est prévu pour ce module dans les phases suivantes */
  plannedContent: string;
}

/**
 * Page d'un module dont la logique métier n'est pas encore développée.
 * L'état est explicite et honnête : la page n'est JAMAIS présentée comme fonctionnelle.
 */
export function ModuleInPreparation({ title, description, icon = HardHat, plannedContent }: ModuleInPreparationProps) {
  return (
    <div className="space-y-4">
      <PageHeader title={title} description={description} />
      <Alert tone="info" title="Module en préparation">
        Ce module sera activé dans les phases suivantes du projet. {plannedContent}
      </Alert>
      <EmptyState
        icon={icon}
        title="Module en préparation"
        description="Cette section n’est pas encore fonctionnelle. Aucune donnée fictive n’est affichée ici : elle sera alimentée par les données réelles une fois le module développé."
      />
    </div>
  );
}
