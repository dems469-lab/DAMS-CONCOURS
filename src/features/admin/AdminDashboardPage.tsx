import {
  BookOpen,
  FileText,
  GraduationCap,
  Library,
  ListChecks,
  Users,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Alert } from '@/components/ui/Alert';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Database } from 'lucide-react';

/**
 * Tableau de bord administrateur — PROMPT 02 (interface et structure uniquement).
 * Les compteurs proviendront des repositories locaux et cloud (PROMPT 03-04).
 * Tant qu'aucune donnée réelle n'existe, chaque indicateur affiche son état vide.
 */
export function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Vue générale"
        description="Indicateurs de contenu de la plateforme. Les valeurs proviennent exclusivement des données réelles."
      />

      <Alert tone="info" title="Base de données en cours de branchement">
        Les compteurs afficheront les valeurs réelles dès que la base locale (PROMPT 03) et
        l’administration (PROMPT 04) seront opérationnelles. Aucune valeur n’est simulée.
      </Alert>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard label="Concours" value={null} icon={<GraduationCap className="h-5 w-5" />} />
        <StatCard label="Matières" value={null} icon={<BookOpen className="h-5 w-5" />} />
        <StatCard label="Cours" value={null} icon={<FileText className="h-5 w-5" />} />
        <StatCard label="Questions" value={null} icon={<ListChecks className="h-5 w-5" />} />
        <StatCard label="Documents" value={null} icon={<Library className="h-5 w-5" />} />
        <StatCard label="Utilisateurs" value={null} icon={<Users className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader
          title="Contenu récent"
          subtitle="Dernières modifications effectuées par les administrateurs (journal traçable du PROMPT 04)."
          icon={<Database className="h-5 w-5" />}
        />
        <CardBody>
          <EmptyState
            icon={Database}
            title="Aucune opération enregistrée"
            description="L’historique des opérations de publication (création, modification, suppression) sera affiché ici, à partir du journal content_revisions."
          />
        </CardBody>
      </Card>
    </div>
  );
}
