# DAMS CONCOURS

Plateforme éducative gratuite pour la préparation des **concours directs de la Fonction publique du Burkina Faso** : catalogue des concours, cours par matière, moteur de QCM, examens blancs chronométrés, planning de révision, révision espacée et statistiques personnelles.

- **100 % gratuit** — sans abonnement, sans publicité.
- **Hors connexion d'abord** — l'application reste utilisable sans Internet (IndexedDB + PWA), puis synchronise.
- **Mobile et ordinateur** — navigation inférieure sur smartphone, latérale sur ordinateur, mode clair et sombre.

## Documentation du projet

| Document | Contenu |
|---|---|
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | État actuel du projet (actualisé à chaque intervention) |
| [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) | Architecture technique et structure du code |
| [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md) | Plan d'exécution, audit d'environnement, risques |
| [DATABASE_DESIGN.md](DATABASE_DESIGN.md) | Modèle de données local (Dexie) et cloud (PostgreSQL) |
| [SECURITY_PLAN.md](SECURITY_PLAN.md) | Sécurité, rôles et politiques RLS |

## Stack technique

React 18 · TypeScript (strict) · Vite 6 · Tailwind CSS 3.4 · React Router 6 · Lucide React · React Hook Form + Zod · Dexie (IndexedDB, à venir) · Supabase (à venir) · Capacitor (Android, à venir)

## Fonctionnalités (PROMPT 02 — fondations et interface)

- **Espace public** : accueil, catalogue des concours, fonctionnalités, à propos, conditions d'utilisation, politique de confidentialité, 404.
- **Espace candidat** : tableau de bord, profil, modules Matières / Cours / Bibliothèque / Entraînement / Examens blancs / Planning / Résultats (affichés explicitement « Module en préparation », jamais maquettés).
- **Espace administrateur** : `/admin` protégé par un guard, tableau de bord et 12 modules (interface seule, logique métier aux phases suivantes).
- **Design system** : 23 composants réutilisables, mode clair / sombre persistant, navigation inférieure sur mobile et latérale sur ordinateur.
- **Authentification** : formulaires validés (React Hook Form + Zod), aucun faux système de connexion — message explicite tant que Supabase n'est pas configuré.

## Compilation sur GitHub

Chaque push déclenche le workflow **CI** (`.github/workflows/ci.yml`) : installation des dépendances, vérification TypeScript et build de production. Le résultat est visible dans l'onglet **Actions** du dépôt.

## Développement local

```bash
npm install
cp .env.example .env   # renseigner VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY si disponibles
npm run dev
```

Sans identifiants Supabase, l'application fonctionne en **mode local** (données de développement clairement étiquetées, jamais présentées comme officielles).

## Principes du projet

Aucune donnée officielle n'est inventée : les fiches de concours ne contiennent que des informations vérifiées et sourcées, ou restent vides en attendant la saisie par les administrateurs. Les documents ne sont jamais présentés comme des annales officielles sans vérification.

---

© DAMS CONCOURS — projet éducatif pour les candidats aux concours de la Fonction publique du Burkina Faso.
