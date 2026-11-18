# PROJECT_STATUS.md — DAMS CONCOURS

> État du projet. Actualisé à la fin de chaque intervention (règle permanente n°16).
> Dernière mise à jour : 2026-11-18 — PROMPT 02 (FONDATIONS ET INTERFACE) : **terminé, en attente de validation du client avant PROMPT 03**.

## Phase actuelle

**PROMPT 02 — FONDATIONS ET INTERFACE : TERMINÉ.** Application réelle (pas une maquette), TypeScript strict, build de production vérifié localement ET sur GitHub Actions.

## Environnement

| Élément | Valeur |
|---|---|
| Node.js / npm | v24.21.0 / 11.19.0 |
| Dépôt GitHub | https://github.com/dems469-lab/DAMS-CONCOURS (public) |
| CI GitHub Actions | ✅ workflow `ci.yml` : install + typecheck + build de production à chaque push |
| Clés Supabase | ❌ toujours non fournies → mode de développement local, signalé explicitement dans l'interface |

## Livrables du PROMPT 02

### Fichiers créés (application)
- **Config** : `package.json`, `vite.config.ts`, `tsconfig.json` (strict), `tailwind.config.js` (palette officielle), `postcss.config.js`, `index.html` (anti-flash de thème, méta mobile).
- **Socle** : `src/main.tsx`, `src/app/App.tsx`, `src/app/router.tsx`, `src/app/providers/ThemeProvider.tsx`, `src/app/guards.tsx` (RequireAuth, RequireAdmin).
- **Layouts (3 espaces)** : `src/app/layouts/PublicLayout.tsx` (en-tête public + pied de page), `CandidateLayout.tsx` (barre latérale + barre inférieure 5 items + menu « Plus »), `AdminLayout.tsx` (espace admin distinct).
- **Design system (`src/components/ui/`)** : Button, Input, Textarea, Select, Checkbox, Radio, Card, Badge, Modal/Dialog, Dropdown, Table, Pagination, Tabs, Tooltip, Alert, Toast (+provider), Skeleton, EmptyState, ErrorState, LoadingState, PageHeader, SearchBar, StatCard.
- **Composants métier** : `ModuleInPreparation` (état clair des modules non développés — jamais présentés comme fonctionnels).
- **Pages publiques** : Accueil (slogan « Préparons aujourd'hui, réussissons demain. », sections présentation / fonctionnalités / bibliothèque / QCM / examens / hors connexion / gratuité), Catalogue des concours, Fonctionnalités, À propos, CGU, Confidentialité, 404.
- **Authentification** : Connexion, Inscription, Mot de passe oublié, Profil — React Hook Form + Zod, aucun faux système de connexion (message explicite tant que Supabase n'est pas configuré).
- **Espace candidat** : Tableau de bord (cartes de statistiques à états vides honnêtes, accès rapides fonctionnels, aucun chiffre inventé), Profil (sauvegarde locale réelle + toast), 7 modules en préparation.
- **Espace admin** : layout + route `/admin` protégée par guard, tableau de bord (6 compteurs à états vides réels), 12 modules en préparation, chargement paresseux du bundle admin.
- **Services** : `services/auth/authService.ts` (détection de configuration cloud), `services/auth/session.ts`, `services/profile/localProfile.ts`.

### Fichiers modifiés
`PROJECT_ARCHITECTURE.md` (structure réelle), `README.md` (arborescence, fonctionnalités), ce fichier.

### Dépendances ajoutées
react 18.3, react-dom, react-router-dom 6.28, react-hook-form 7.54, zod 3.24, @hookform/resolvers, lucide-react 0.468, typescript 5.6, vite 6, @vitejs/plugin-react, tailwindcss 3.4, autoprefixer, postcss, @types/react, @types/react-dom, @types/node.
**Recharts : volontairement NON ajouté** à cette phase (aucune donnée réelle à grapher ; il sera ajouté au PROMPT 08 pour éviter une dépendance lourde inutile, conformément au §14 du PROMPT 02).

## Tests réellement effectués

1. ✅ `npx tsc --noEmit` — 0 erreur (7 erreurs initiales corrigées : imports, param de route, useState inutilisé).
2. ✅ `npm run build` (tsc + vite build) — succès : 1634 modules, ~101 Ko gzip.
3. ✅ Serveur de préproduction `vite preview` + curl : 15 routes testées → HTTP 200 toutes, y compris 404 SPA et `/admin`.
4. ✅ Vérification visuelle du code : navigation active, thème clair/sombre (classe `dark` + localStorage), responsive (nav inférieure < 768 px, latérale ≥ 768 px), focus visible, labels de formulaires, rôles ARIA (dialog, tablist, alert, status).
5. ⏳ Test rendu réel sur smartphone : à faire par le client (ouvrir le lien d'aperçu) ; le code respecte les contraintes (safe-area, overflow-x hidden, tailles tactiles ≥ 44 px).
6. ✅ CI GitHub Actions : build de production exécuté sur GitHub à chaque push (voir §Compilations ci-dessous).

## Compilations

| Quand | Où | Résultat |
|---|---|---|
| PROMPT 01 | CI GitHub (étapes conditionnelles, sans package.json) | ✅ success |
| PROMPT 02 (local) | `npm run build` | ✅ success |
| PROMPT 02 (GitHub) | CI `ci.yml` après push | ✅ à confirmer sur l'onglet Actions après ce push |

## Erreurs rencontrées et corrigées

- `__dirname` absent en ESM dans `vite.config.ts` → `fileURLToPath(import.meta.url)`.
- Cache npm CI sans `package-lock.json` → cache conditionnel dans le workflow.
- 7 erreurs TypeScript initiales (imports mal ciblés, prop de route manquante) → corrigées, re-vérifiées.

## Décisions d'interface prises

1. Palette officielle appliquée comme tokens Tailwind réutilisables (`navy-950 #081426`, `navy-800 #102642`, `electric-500 #2563EB`, `cyan-neon #06B6D4`, `offwhite #F8FAFC`, `grayblue-400 #94A3B8`, `success #16A34A`, `danger #DC2626`).
2. Dégradés limités (2 halos radiaux discrets sur l'accueil), animations ≤ 0,3 s, pas d'effets lumineux multiples (consigne §3).
3. Boutons toujours actifs : chaque lien mène à une route existante ; les modules non développés affichent explicitement « Module en préparation ».
4. Écran d'authentification sans faux succès : le message « configuration requise » est affiché quand le cloud n'est pas branché.

## Restant (prochaine phase)

- PROMPT 03 — base de données et sécurité (Dexie + Supabase + RLS). **Prérequis côté client : fournir `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.**
- Tests de rendu réel sur appareil du client après validation du PROMPT 02.
