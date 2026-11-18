import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { BRAND } from '@/lib/brand';

const COMMITMENTS = [
  {
    icon: HeartHandshake,
    title: 'Gratuité totale',
    text: 'Aucun abonnement, aucune publicité, aucune fonctionnalité payante. La plateforme est conçue pour rester accessible à tous les candidats.',
  },
  {
    icon: ShieldCheck,
    title: 'Contenu vérifié',
    text: 'Chaque information de concours porte sa source. Aucune donnée officielle n’est inventée : une fiche sans source reste vide jusqu’à validation.',
  },
  {
    icon: Target,
    title: 'Utile hors connexion',
    text: 'Conçu pour les conditions réelles d’utilisation : l’application fonctionne sans Internet et synchronise dès que le réseau revient.',
  },
] as const;

export function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 py-6 md:py-10">
      <PageHeader title="À propos" description={BRAND.positioning} />

      <Card glow>
        <CardBody className="space-y-3">
          <p className="text-sm font-black">{BRAND.name}</p>
          <p className="text-xs font-semibold text-electric-500 dark:text-cyan-neon">{BRAND.slogan}</p>
          <p className="text-xs leading-relaxed text-muted">
            DAMS CONCOURS est une académie numérique dédiée aux candidats des concours directs de la
            Fonction publique du Burkina Faso. Elle rassemble en un seul endroit le catalogue des
            concours, des cours par matière, un moteur d’entraînement QCM, un simulateur d’examens
            blancs et des outils de suivi de progression — avec un mode hors connexion complet.
          </p>
        </CardBody>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {COMMITMENTS.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardBody>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-soft text-success">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-3 text-sm font-bold">{title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardBody className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-muted">Rejoignez la plateforme et préparez votre concours dès aujourd’hui.</p>
          <Link to="/auth/register">
            <Button>Commencer gratuitement</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
