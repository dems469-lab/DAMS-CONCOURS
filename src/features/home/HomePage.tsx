import { Link } from 'react-router-dom';
import {
  BookOpenCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  HeartHandshake,
  ListChecks,
  WifiOff,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BRAND } from '@/lib/brand';

const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Catalogue des concours',
    text: 'Fiches des concours directs : conditions d’accès, matières, épreuves et coefficients, avec sources officielles.',
  },
  {
    icon: FileText,
    title: 'Cours par matière',
    text: 'Culture générale, français, mathématiques, logique, institutions… des leçons structurées en chapitres.',
  },
  {
    icon: ListChecks,
    title: 'Entraînement QCM',
    text: 'Choix unique, réponses multiples, vrai/faux, réponse courte — avec corrections et explications.',
  },
] as const;

export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 py-6 md:py-10">
      {/* ── Section principale ─────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border border-navy-700 bg-navy-950 px-6 py-12 text-center text-offwhite">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 55% at 50% 0%, rgba(37,99,235,0.30) 0%, transparent 70%), radial-gradient(35% 35% at 85% 100%, rgba(6,182,212,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-500 text-white">
            <GraduationCap className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-2xl font-black tracking-tight sm:text-4xl">
            Préparez vos concours.
            <br />
            <span className="text-cyan-neon">Construisez votre avenir.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-grayblue-400">
            Une plateforme gratuite pour préparer les concours directs de la Fonction publique du
            Burkina Faso, apprendre, vous entraîner et mesurer votre progression.
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-cyan-neon">
            {BRAND.slogan}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/auth/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Commencer gratuitement
              </Button>
            </Link>
            <Link to="/concours" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Découvrir les concours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Présentation de la plateforme ──────────────────────────── */}
      <section>
        <Card>
          <CardHeader title="Une académie numérique pour les concours du Burkina Faso" />
          <CardBody>
            <p className="text-xs leading-relaxed text-muted">
              {BRAND.positioning} DAMS CONCOURS réunit en un seul endroit le catalogue des concours
              directs, des cours organisés par matière et par chapitre, un moteur d’entraînement
              corrigé, un simulateur d’examens blancs chronométrés et des outils de suivi de
              progression personnelle — pensés dès l’origine pour fonctionner hors connexion.
            </p>
          </CardBody>
        </Card>
      </section>

      {/* ── Fonctionnalités principales ────────────────────────────── */}
      <section>
        <h2 className="text-lg font-black tracking-tight">Fonctionnalités principales</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <Card key={title} glow>
              <CardBody>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-500/10 text-electric-500 dark:bg-cyan-soft dark:text-cyan-neon">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-sm font-bold">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="mt-3 text-right">
          <Link to="/fonctionnalites" className="text-xs font-semibold text-electric-500 hover:underline dark:text-cyan-neon">
            Voir toutes les fonctionnalités →
          </Link>
        </div>
      </section>

      {/* ── Bibliothèque pédagogique + QCM + examens blancs ─────────── */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader
            title="Bibliothèque pédagogique"
            subtitle="Documents classés, sourcés et vérifiés."
            icon={<BookOpenCheck className="h-5 w-5" />}
          />
          <CardBody>
            <p className="text-xs leading-relaxed text-muted">
              Chaque document porte sa source et son statut de vérification. Les documents de
              démonstration ne sont jamais présentés comme des annales officielles.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            title="Examens blancs"
            subtitle="Chronomètre, barème réel, correction détaillée."
            icon={<ClipboardList className="h-5 w-5" />}
          />
          <CardBody>
            <p className="text-xs leading-relaxed text-muted">
              Des examens configurables par concours et par matière, avec notation calculée sur vos
              réponses réelles et correction complète après la soumission.
            </p>
          </CardBody>
        </Card>
      </section>

      {/* ── Fonctionnement hors connexion ──────────────────────────── */}
      <section>
        <Card glow>
          <CardBody className="flex flex-wrap items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-500/10 text-electric-500 dark:bg-cyan-soft dark:text-cyan-neon">
              <WifiOff className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-bold">Fonctionne même sans Internet</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Vos cours, réponses, favoris et plans de révision sont enregistrés sur votre appareil
                (IndexedDB). Dès le retour du réseau, tout est synchronisé automatiquement — et rien
                n’est jamais perdu en cas de coupure.
              </p>
            </div>
            <Badge tone="success">Mode hors connexion prioritaire</Badge>
          </CardBody>
        </Card>
      </section>

      {/* ── Engagement de gratuité ─────────────────────────────────── */}
      <section>
        <Card>
          <CardBody className="flex flex-wrap items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-soft text-success">
              <HeartHandshake className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-bold">Engagement de gratuité</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Aucun abonnement, aucune publicité, aucune fonctionnalité payante obligatoire.
                La plateforme est conçue pour rester accessible à tous les candidats.
              </p>
            </div>
            <Link to="/cgu" className="text-xs font-semibold text-electric-500 hover:underline dark:text-cyan-neon">
              Conditions d’utilisation
            </Link>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
