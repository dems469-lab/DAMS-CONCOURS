import { Link } from 'react-router-dom';
import {
  BookOpenCheck,
  CalendarClock,
  ClipboardList,
  FileText,
  GraduationCap,
  TrendingUp,
  Wifi,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';

const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Catalogue des concours',
    description:
      'Fiches détaillées des concours directs : conditions d’accès, matières, épreuves et coefficients, toujours avec leurs sources officielles.',
  },
  {
    icon: FileText,
    title: 'Cours structurés',
    description:
      'Leçons organisées en chapitres avec objectifs, définitions, exemples, résumés et mini-tests, du culture général aux spécialités.',
  },
  {
    icon: BookOpenCheck,
    title: 'Bibliothèque pédagogique',
    description:
      'Documents classés et consultables, chaque document portant sa source et son statut de vérification.',
  },
  {
    icon: ClipboardList,
    title: 'Entraînement QCM',
    description:
      'Questions à choix unique, réponses multiples, vrai/faux et réponses courtes, avec correction et explications.',
  },
  {
    icon: TrendingUp,
    title: 'Examens blancs chronométrés',
    description:
      'Simulateur de concours avec barème réel, navigation entre questions et correction détaillée après soumission.',
  },
  {
    icon: CalendarClock,
    title: 'Planning et révision espacée',
    description:
      'Objectifs journaliers et révision des erreurs après 1, 3, 7, 14 et 30 jours, intégrée à votre progression.',
  },
  {
    icon: Wifi,
    title: 'Fonctionne hors connexion',
    description:
      'Vos cours, réponses et favoris sont enregistrés sur votre appareil puis synchronisés dès le retour du réseau.',
  },
] as const;

export function FeaturesPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 py-6 md:py-10">
      <PageHeader
        title="Fonctionnalités"
        description="Tout ce dont vous avez besoin pour préparer vos concours directs, dans une seule application gratuite."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <Card key={title} glow>
            <CardBody className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-500 dark:bg-cyan-soft dark:text-cyan-neon">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-sm font-bold">{title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardBody className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-bold">Prêt à commencer ?</p>
          <Link to="/auth/register">
            <Button>Créer mon compte gratuitement</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
