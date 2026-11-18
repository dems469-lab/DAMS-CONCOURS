import { Link } from 'react-router-dom';
import {
  BookOpenCheck,
  CalendarClock,
  ClipboardList,
  GraduationCap,
  ListChecks,
  RotateCcw,
  Target,
  Timer,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Alert } from '@/components/ui/Alert';
import { EmptyState } from '@/components/ui/EmptyState';
import { getLocalProfile } from '@/services/profile/localProfile';

/**
 * Tableau de bord candidat — PROMPT 02.
 * Les indicateurs proviendront des tentatives réelles (base locale PROMPT 03).
 * Aucune statistique n'est fabriquée : tant que la base n'est pas branchée,
 * chaque carte affiche son état vide explicite.
 */
export function DashboardPage() {
  const profile = getLocalProfile();
  const firstName = profile?.name?.trim().split(/\s+/)[0];

  const QUICK_LINKS = [
    { to: '/cours', label: 'Continuer mes cours', icon: BookOpenCheck },
    { to: '/entrainement', label: 'Faire un QCM', icon: ListChecks },
    { to: '/examens', label: 'Passer un examen blanc', icon: ClipboardList },
    { to: '/resultats', label: 'Revoir mes erreurs', icon: RotateCcw },
    { to: '/resultats', label: 'Consulter mes résultats', icon: TrendingUp },
  ] as const;

  return (
    <div className="space-y-4">
      <PageHeader
        title={firstName ? `Bonjour, ${firstName} 👋` : 'Bienvenue sur votre tableau de bord 👋'}
        description={
          profile?.targetContest
            ? `Concours préparé : ${profile.targetContest}`
            : 'Indiquez le concours que vous préparez dans votre profil pour personnaliser cet espace.'
        }
        actions={
          <Link to="/profil">
            <Button variant="secondary" size="sm">
              <Target className="h-3.5 w-3.5" />
              Définir mon objectif
            </Button>
          </Link>
        }
      />

      {/* Progression générale — données réelles à partir du PROMPT 03 */}
      <Card glow>
        <CardHeader
          title="Progression générale"
          subtitle="Construite sur vos tentatives réelles dès l’ouverture de la base de données."
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <CardBody>
          <EmptyState
            icon={GraduationCap}
            title="Aucune activité enregistrée pour l’instant"
            description="Commencez par un QCM ou un examen blanc : vos scores, votre temps d’étude et vos erreurs seront suivis ici, calculés sur vos données réelles uniquement."
            action={
              <Link to="/entrainement">
                <Button size="sm">Commencer un entraînement</Button>
              </Link>
            }
          />
        </CardBody>
      </Card>

      {/* Cartes de statistiques — états vides honnêtes */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Matières étudiées" value={null} icon={<BookOpenCheck className="h-5 w-5" />} />
        <StatCard label="Questions traitées" value={null} icon={<ListChecks className="h-5 w-5" />} />
        <StatCard label="Taux de réussite" value={null} icon={<Target className="h-5 w-5" />} />
        <StatCard label="Temps d’étude" value={null} icon={<Timer className="h-5 w-5" />} />
      </div>

      {/* Accès rapides — chaque lien mène vers une route existante */}
      <Card>
        <CardHeader title="Accès rapides" icon={<ListChecks className="h-5 w-5" />} />
        <CardBody className="grid gap-2 sm:grid-cols-2">
          {QUICK_LINKS.map(({ to, label, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold transition-colors hover:bg-slate-100 dark:border-navy-600 dark:hover:bg-navy-700"
            >
              <Icon className="h-4 w-4 text-electric-500 dark:text-cyan-neon" />
              {label}
            </Link>
          ))}
        </CardBody>
      </Card>

      {/* Objectifs journaliers — module planning (PROMPT 08) */}
      <Card>
        <CardHeader
          title="Objectifs du jour"
          subtitle="Définissables dans le planning une fois le module activé."
          icon={<CalendarClock className="h-5 w-5" />}
        />
        <CardBody>
          <EmptyState
            icon={CalendarClock}
            title="Pas encore d’objectifs définis"
            description="Le planning de révision avec objectifs journaliers sera disponible au PROMPT 08. Aucun objectif fictif n’est affiché."
          />
        </CardBody>
      </Card>

      <Alert tone="info" title="Suivi des statistiques garanti">
        Les graphiques de progression n’apparaîtront que lorsque des tentatives réelles seront
        enregistrées (base locale au PROMPT 03). Jamais de statistiques inventées.
      </Alert>
    </div>
  );
}
