# PROJECT_ARCHITECTURE.md — DAMS CONCOURS

> Document d'architecture. À lire avant toute modification architecturale (règle permanente n°2).
> Dernière mise à jour : 2026-11-18 (PROMPT 01 — AUDIT ET PLAN).

## 1. Vision du produit

DAMS CONCOURS est une plateforme éducative web/mobile-first dédiée à la préparation des **concours directs de la Fonction publique du Burkina Faso**. Elle doit fonctionner **hors connexion** (PWA + IndexedDB), se synchroniser avec un cloud Supabase, et offrir un panneau d'administration complet pour la gestion du contenu pédagogique.

Contraintes permanentes :
- Gratuit et sans abonnement ni publicité (règles 10–11).
- Mobile d'abord (règle 8), hors connexion (règle 9).
- Aucune donnée officielle inventée (règle 5) : les fiches concours ne sont peuplées qu'avec des données vérifiées et sourcées, ou restent vides.
- Aucun secret dans le frontend (règle 6), RLS Supabase obligatoire (règle 7).
- Une seule base de code React pour Web et Android (Capacitor, PROMPT 11).

## 2. Stack technique

| Couche | Choix | Justification |
|---|---|---|
| UI | React 19 + TypeScript + Vite | Rapide, standard, écosystème mature |
| Style | Tailwind CSS | Design system cohérent, responsive, mode sombre natif |
| Routing | React Router | SPA avec routes candidat (`/`) et admin (`/admin`) séparées |
| Icônes | Lucide React | SVG légers, aucune requête réseau |
| Formulaires | React Hook Form + Zod | Validation stricte, réutilisée côté import/admin |
| Base locale | Dexie (IndexedDB) | Offline-first, requêtes indexées, migrations versionnées |
| Base cloud | Supabase (PostgreSQL + Auth + Storage) | Offre gratuite, RLS natif, temps réel non requis au départ |
| PWA | `vite-plugin-pwa` (Workbox) | Manifest + service worker + stratégie de cache |
| Mobile | Capacitor (préparé au PROMPT 11, non installé maintenant) | Réutilise la même codebase |
| Tests | Vitest (+ Playwright en audit, PROMPT 10) | Unitaires + parcours |

## Structure des dossiers (cible — état réel après PROMPT 02)

```
DAMS-CONCOURS/
├── public/                  # Manifest PWA, icônes, service worker (via plugin)
├── src/
│   ├── app/
│   │   ├── App.tsx          # Providers globaux + BrowserRouter
│   │   ├── router.tsx       # Routes des 3 espaces + 404
│   │   ├── guards.tsx       # RequireAuth, RequireAdmin (ergonomie ; RLS = autorité réelle)
│   │   ├── NotFoundPage.tsx
│   │   ├── layouts/         # PublicLayout, CandidateLayout, AdminLayout
│   │   └── providers/       # ThemeProvider (clair/sombre persistant)
│   ├── components/
│   │   ├── ui/              # Design system (23 composants) : Button, Input, Textarea,
│   │   │                    # Select, Checkbox, Radio, Card, Badge, Modal/Dialog,
│   │   │                    # Dropdown, Table, Pagination, Tabs, Tooltip, Alert, Toast,
│   │   │                    # Skeleton, EmptyState, ErrorState, LoadingState, PageHeader,
│   │   │                    # SearchBar, StatCard
│   │   └── domain/          # ModuleInPreparation (état explicite des modules à venir)
│   ├── features/
│   │   ├── home/            # Accueil (slogan, sections statiques)
│   │   ├── public/          # Catalogue concours, fonctionnalités, à propos, CGU, confidentialité
│   │   ├── auth/            # Connexion, inscription, mot de passe oublié, profil
│   │   ├── dashboard/       # Tableau de bord candidat
│   │   ├── admin/           # Tableau de bord administrateur (modules : interface seule)
│   │   ├── contests/        # PROMPT 05
│   │   ├── subjects/ library/ practice/ exams/ planner/ stats/  # PROMPTS 05-08
│   │   └── sync/            # PROMPT 09
│   ├── services/
│   │   ├── auth/            # authService (détection cloud), session
│   │   └── profile/         # localProfile (localStorage)
│   ├── hooks/               # useOnline, useTheme…
│   ├── lib/                 # brand.ts (identité officielle), utils.ts
│   ├── types/
│   └── index.css
├── supabase/migrations/     # PROMPT 03
├── .github/workflows/ci.yml # Build de production sur GitHub à chaque push
├── PROJECT_ARCHITECTURE.md
├── PROJECT_STATUS.md
├── DEVELOPMENT_PLAN.md
├── DATABASE_DESIGN.md
└── SECURITY_PLAN.md
```

Règle : aucun fichier ne contient des centaines de lignes de logique sans séparation (règle 13) — une feature = un dossier ; la logique de données passe par les repositories ; la logique UI passe par les composants.

## 4. Modularité et relations entre modules

```
                    ┌─────────────┐
                    │   admin/*   │ (écriture contenu, réservé admins)
                    └──────┬──────┘
                           │ écrit dans
                           ▼
   cloud (Supabase) ◄────► data/sync ◄────► data/db (Dexie)
                           │                  │
                           ▼                  ▼
        contests / subjects / library / practice / exams / planner / stats
                           │
                           ▼
                    app (routes, shell, auth)
```

- **Contenu publié** (ministères, concours, matières, chapitres, leçons, questions, documents, examens) : écrit par l'admin sur Supabase ; lu en local via Dexie, peuplé par la synchronisation. **Le serveur est la référence** pour ce contenu.
- **Données privées candidat** (attempts, attempt_answers, favorites, study_plans, revision_items, sync_queue) : créées en local d'abord (offline-first), poussées vers le cloud ; **jamais écrasées silencieusement** lors d'un conflit.
- **auth** : session Supabase optionnelle. Un candidat peut utiliser l'app localement sans compte (identité locale anonyme) ; à la création de compte, ses données locales sont migrées vers son profil.
- **stats** : calculé uniquement à partir des tentatives réellement enregistrées (aucune statistique inventée).

## 5. Décisions d'architecture clés

| # | Décision | Raison |
|---|---|---|
| A1 | Offline-first : toute écriture candidat passe d'abord par Dexie, puis la SyncQueue | Règle 9 ; usage réel (mobile, réseau instable) |
| A2 | Repositories comme unique couche d'accès aux données | Testable, remplace Dexie par autre chose sans toucher l'UI |
| A3 | Un seul schéma TypeScript d'entités partagé local/cloud | Évite les écarts de forme de données |
| A4 | Contenu pédagogique versionné (`content_revisions`) | Traçabilité des publications (PROMPT 04) |
| A5 | Suppressions logiques (`deleted_at`) pour le contenu synchronisable | Conflits/propagation sûrs (PROMPT 09) |
| A6 | UUID v4 partout (local et cloud) | Évite les collisions de clés à la sync |
| A7 | Mode développement local si les identifiants Supabase ne sont pas fournis | PROMPT 03 : variables d'environnement + données locales de développement clairement marquées « démonstration », jamais présentées comme officielles |
| A8 | Editeur de leçons : rendu depuis un modèle de sections structurées, édité visuellement | L'admin ne tape jamais de JSON (PROMPT 04) |

## 6. Flux de synchronisation (résumé — détaillé dans DEVELOPMENT_PLAN.md)

1. Chaque écriture locale crée une entrée `SyncQueue` (id, op, entité, entityId, date, statut, tentatives, erreur).
2. Sur retour de connexion (événement `online` + heartbeat), le moteur vide la file dans l'ordre.
3. Confirmation serveur → `done` ; échec → `retry` avec délai progressif (30 s → 1 min → 5 min → 30 min, plafonné).
4. Conflit : serveur gagne pour le contenu publié ; pour les données candidat, les deux versions sont conservées et l'utilisateur tranche (jamais d'écrasement silencieux, jamais de purge locale sur erreur).
5. Les contenus publiés sont rafraîchis par téléchargement en lots paginés + horodatage `updated_at`.

## 7. Risques techniques et mesures (voir aussi DEVELOPMENT_PLAN.md §5)

- **Mémoire du téléphone (environnement d'exécution)** : builds longs à risque → ne lancer les builds que lorsque nécessaire, pas de dev-server permanent.
- **Quota IndexedDB limité** : documents PDF téléchargés sous forme de blobs chiffrés non nécessaires ; on stocke des métadonnées + cache de fichiers avec plafond et éviction LRU.
- **Clés Supabase** : uniquement `anon` exposée ; `service_role` jamais dans le frontend (règle 6).
- **RLS mal configurée** : migrations + politiques testées (PROMPT 10) avant tout déploiement.

## 8. Ce que ce document interdit de faire sans mise à jour préalable

Changer de base locale, changer de fournisseur cloud, introduire un payant/abonnement/publicité, restructurer `src/` hors du modèle ci-dessus, ajouter une seconde application mobile indépendante.
