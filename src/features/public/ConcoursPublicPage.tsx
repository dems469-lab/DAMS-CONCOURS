import { GraduationCap } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchBar } from '@/components/ui/SearchBar';

/**
 * Catalogue public des concours directs.
 * PROMPT 02 : l'interface est prête (recherche, filtres à venir) mais la logique
 * de données n'est pas encore branchée — état explicite, aucune donnée fictive.
 */
export function ConcoursPublicPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 py-6 md:py-10">
      <PageHeader
        title="Catalogue des concours"
        description="Fiches des concours directs de la Fonction publique du Burkina Faso : conditions d'accès, matières, épreuves et sources officielles."
      />

      <Alert tone="info" title="Module en préparation">
        Le catalogue sera alimenté par les données vérifiées et sourcées à partir du PROMPT 05.
        Aucune fiche fictive n’est affichée : un concours absent de cette page est simplement
        en attente de validation, pas ouvert à un inventaire inventé.
      </Alert>

      <SearchBar placeholder="Rechercher un concours, un ministère, une spécialité…" disabled aria-disabled="true" />

      <EmptyState
        icon={GraduationCap}
        title="Aucun concours disponible pour l’instant"
        description="Les fiches de concours seront publiées ici une fois saisies et validées par les administrateurs, avec leurs sources officielles."
      />
    </div>
  );
}
