import { Database, HardDrive, Lock, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardBody } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';

const PRINCIPLES = [
  {
    icon: HardDrive,
    title: 'Stockage local d’abord',
    text: 'Vos réponses, favoris, plans de révision et résultats sont enregistrés dans le stockage local de votre navigateur (IndexedDB). Ils restent sur votre appareil.',
  },
  {
    icon: Database,
    title: 'Synchronisation minimale',
    text: 'Lorsqu’un compte est créé, seules les données nécessaires à la sauvegarde de votre progression sont synchronisées avec le serveur : jamais de revente ni de partage publicitaire.',
  },
  {
    icon: Lock,
    title: 'Sécurité',
    text: 'Les accès aux données sont protégés par des règles de sécurité côté serveur (RLS) : chacun n’accède qu’à ses propres données. Aucun mot de passe n’est stocké en clair.',
  },
  {
    icon: Trash2,
    title: 'Suppression',
    text: 'Vous pouvez demander la suppression de votre compte et de vos données à tout moment via les paramètres de votre profil.',
  },
] as const;

export function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 py-6 md:py-10">
      <PageHeader
        title="Politique de confidentialité"
        description="Ce que nous collectons — et surtout ce que nous ne collectons pas."
      />

      <Alert tone="info" title="Aucune publicité, aucun traçage publicitaire">
        La plateforme n’intègre aucun traceur publicitaire et ne revend aucune donnée.
        Elle ne demande que le minimum : un identifiant de compte et votre progression.
      </Alert>

      <div className="grid gap-4 sm:grid-cols-2">
        {PRINCIPLES.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardBody>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-500/10 text-electric-500 dark:bg-cyan-soft dark:text-cyan-neon">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-3 text-sm font-bold">{title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
