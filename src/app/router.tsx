import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { CandidateLayout } from './layouts/CandidateLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { RequireAdmin } from './guards';
import { LoadingState } from '@/components/ui/LoadingState';
import { ModuleInPreparation } from '@/components/domain/ModuleInPreparation';
import { HomePage } from '@/features/home/HomePage';
import { ConcoursPublicPage } from '@/features/public/ConcoursPublicPage';
import { FeaturesPage } from '@/features/public/FeaturesPage';
import { AboutPage } from '@/features/public/AboutPage';
import { TermsPage } from '@/features/public/TermsPage';
import { PrivacyPage } from '@/features/public/PrivacyPage';
import { LoginPage } from '@/features/auth/LoginPage';
import { RegisterPage } from '@/features/auth/RegisterPage';
import { ForgotPasswordPage } from '@/features/auth/ForgotPasswordPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { ProfilePage } from '@/features/auth/ProfilePage';
import { NotFoundPage } from './NotFoundPage';

/** Chargement paresseux de l'espace administrateur (bundle séparé). */
const AdminDashboardPage = lazy(() =>
  import('@/features/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })),
);

const PENDING_SUFFIX =
  'Il sera alimenté par les données réelles : base locale PROMPT 03, contenus PROMPT 05, moteur PROMPT 06.';

interface PendingModule {
  title: string;
  description: string;
  plannedContent: string;
}

/** Modules candidat dont la logique métier arrive dans les phases suivantes. */
const PENDING_MODULES: Record<string, PendingModule> = {
  '/matieres': {
    title: 'Matières',
    description: 'Bibliothèque organisée : culture générale, français, mathématiques, logique… et spécialités selon les concours.',
    plannedContent: PENDING_SUFFIX,
  },
  '/cours': {
    title: 'Cours',
    description: 'Leçons structurées en chapitres avec objectifs, définitions, exemples, résumés et mini-tests.',
    plannedContent: PENDING_SUFFIX,
  },
  '/bibliotheque': {
    title: 'Bibliothèque',
    description: 'Documents pédagogiques classés, avec source et statut de vérification pour chaque document.',
    plannedContent: PENDING_SUFFIX,
  },
  '/entrainement': {
    title: 'Entraînement (QCM)',
    description: 'Moteur d’entraînement : choix unique, réponses multiples, vrai/faux, réponse courte, avec correction détaillée.',
    plannedContent: PENDING_SUFFIX,
  },
  '/examens': {
    title: 'Examens blancs',
    description: 'Simulateur de concours chronométré avec barème réel et correction après soumission.',
    plannedContent: PENDING_SUFFIX,
  },
  '/planning': {
    title: 'Planning',
    description: 'Calendrier de révision, objectifs journaliers et révision espacée (1, 3, 7, 14 et 30 jours).',
    plannedContent: PENDING_SUFFIX,
  },
  '/resultats': {
    title: 'Mes résultats',
    description: 'Historique des tentatives, scores réels et statistiques construites sur vos données.',
    plannedContent: PENDING_SUFFIX,
  },
};

const ADMIN_PENDING_MODULES: Record<string, PendingModule> = {
  concours: { title: 'Gestion des concours', description: 'Fiches des concours directs : conditions, matières, épreuves et coefficients.', plannedContent: 'La logique métier arrive au PROMPT 04 (administration) avec la base PROMPT 03.' },
  ministeres: { title: 'Gestion des ministères', description: 'Référentiel des ministères organisateurs des concours.', plannedContent: 'La logique métier arrive au PROMPT 04 avec la base PROMPT 03.' },
  matieres: { title: 'Gestion des matières', description: 'Catalogue des matières générales et spécialités professionnelles.', plannedContent: 'La logique métier arrive au PROMPT 04 avec la base PROMPT 03.' },
  cours: { title: 'Gestion des cours', description: 'Éditeur visuel de leçons : titres, sections, listes, tableaux, images et documents.', plannedContent: 'L’éditeur de contenu arrive au PROMPT 04.' },
  questions: { title: 'Gestion des questions', description: 'Saisie des énoncés, propositions, bonne réponse, explication, difficulté et validation.', plannedContent: 'La logique métier arrive au PROMPT 04.' },
  examens: { title: 'Gestion des examens', description: 'Composition des examens blancs : matières, barème, coefficients et durée.', plannedContent: 'La logique métier arrive au PROMPT 04.' },
  documents: { title: 'Gestion des documents', description: 'Bibliothèque de PDF avec source et statut de vérification.', plannedContent: 'La logique métier arrive au PROMPT 04.' },
  actualites: { title: 'Gestion des actualités', description: 'Annonces publiées aux candidats.', plannedContent: 'La logique métier arrive au PROMPT 04.' },
  utilisateurs: { title: 'Gestion des utilisateurs', description: 'Consultation des comptes et attribution contrôlée du rôle administrateur (vérifiée côté serveur).', plannedContent: 'La logique métier arrive au PROMPT 04, avec les politiques RLS du PROMPT 03.' },
  'import-export': { title: 'Importation / Exportation', description: 'Import JSON et CSV avec prévisualisation, validation, détection de doublons ; export des contenus.', plannedContent: 'Les outils d’import/export arrivent au PROMPT 04.' },
  historique: { title: 'Historique', description: 'Journal des opérations de publication et des révisions de contenu.', plannedContent: 'Le journal traçable arrive au PROMPT 04 (table content_revisions).' },
  parametres: { title: 'Paramètres', description: 'Réglages de la plateforme.', plannedContent: 'La logique métier arrive au PROMPT 04.' },
};

function PendingCandidateModule({ path }: { path: string }) {
  const mod = PENDING_MODULES[path];
  if (!mod) return <Navigate to="/dashboard" replace />;
  return (
    <ModuleInPreparation
      title={mod.title}
      description={mod.description}
      plannedContent={mod.plannedContent}
    />
  );
}

function PendingAdminModule() {
  const { section } = useParams<{ section: string }>();
  if (!section) return <Navigate to="/admin" replace />;
  const mod = ADMIN_PENDING_MODULES[section];
  if (!mod) return <Navigate to="/admin" replace />;
  return (
    <ModuleInPreparation
      title={mod.title}
      description={mod.description}
      plannedContent={mod.plannedContent}
    />
  );
}

function LoadingScreen() {
  return <LoadingState fullPage label="Chargement du module…" />;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* ── ESPACE PUBLIC ─────────────────────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/concours" element={<ConcoursPublicPage />} />
        <Route path="/fonctionnalites" element={<FeaturesPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/cgu" element={<TermsPage />} />
        <Route path="/confidentialite" element={<PrivacyPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
        <Route path="/accueil" element={<Navigate to="/" replace />} />
      </Route>

      {/* ── ESPACE CANDIDAT ───────────────────────────────────────────── */}
      <Route element={<CandidateLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/matieres" element={<PendingCandidateModule path="/matieres" />} />
        <Route path="/cours" element={<PendingCandidateModule path="/cours" />} />
        <Route path="/bibliotheque" element={<PendingCandidateModule path="/bibliotheque" />} />
        <Route path="/entrainement" element={<PendingCandidateModule path="/entrainement" />} />
        <Route path="/examens" element={<PendingCandidateModule path="/examens" />} />
        <Route path="/planning" element={<PendingCandidateModule path="/planning" />} />
        <Route path="/resultats" element={<PendingCandidateModule path="/resultats" />} />
      </Route>

      {/* ── ESPACE ADMINISTRATEUR (guard + lazy) ──────────────────────── */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route element={<RequireAdmin />}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingScreen />}>
                <AdminDashboardPage />
              </Suspense>
            }
          />
          <Route path=":section" element={<PendingAdminModule />} />        </Route>
      </Route>

      {/* ── 404 ───────────────────────────────────────────────────────── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
