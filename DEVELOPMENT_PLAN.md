# DEVELOPMENT_PLAN.md — DAMS CONCOURS

> Plan d'exécution. Créé au PROMPT 01. Actualisé à la fin de chaque prompt.
> Dernière mise à jour : 2026-11-18 (PROMPT 01 — AUDIT ET PLAN).

## 1. Audit de l'environnement (réalisé le 2026-11-18)

| Élément | État |
|---|---|
| Répertoire du projet | `/root/projects/DAMS-CONCOURS` — dépôt git, **vide** (un seul commit : « First commit »), aucun fichier source |
| Node.js | v24.21.0 ✅ (supérieur à la version minimale Vite/React actuels) |
| npm | 11.19.0 ✅ |
| Git | 2.43.0 ✅ |
| OS | Ubuntu 24.04.5 LTS (environnement Linux intégré au téléphone via OpenCode) |
| CPU / RAM | 8 cœurs ; ~7,6 Go RAM, ~2,9 Go disponibles |
| Disque | 29 Go libres sur 224 Go (88 % utilisés — surveiller lors des grosses installs type SDK Android) |
| Réseau | ✅ accès au registre npm (`npm ping` OK, `react@19.3.1` visible) |
| Clés Supabase | ❌ **non fournies à ce jour** → mode de développement local jusqu'à configuration (voir §4) |
| Capacitor / Android SDK | ❌ non installés — volontairement reportés au PROMPT 11 |
| Playwright / navigateur headless | non installés — reportés au PROMPT 10 (coûteux en mémoire sur ce téléphone) |

Problèmes identifiés et solutions :
1. **Aucune clé Supabase** → configuration par variables d'environnement (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) + mode local : l'application fonctionne intégralement sur Dexie ; la couche cloud est branchée dès réception des identifiants. Aucune fonctionnalité ne sera remplacée par une maquette.
2. **Espace disque limité (29 Go)** : suivre la taille de `node_modules` et des caches ; le SDK Android (PROMPT 11) devra être installé en dernier et nettoyé après usage si nécessaire.
3. **Mémoire partagée avec le téléphone** : pas de dev-server permanent ni de watchers en arrière-plan ; builds ponctuels, arrêt de tout serveur lancé.
4. **Dépendances lourdes** : aucune dépendance payante (règle 10) ; graphiques réalisés avec une bibliothèque légère gratuite (choix final au PROMPT 08 — candidat : composants SVG maison ou `recharts`, tranché selon le poids du bundle).

## 2. Phases d'exécution

| Phase | Prompt | Contenu | Dépendances |
|---|---|---|---|
| P0 | 01 ✅ | Audit + 5 documents de plan | — |
| P1 | 02 | Fondations : Vite+React+TS, Tailwind, design system (clair/sombre), navigation mobile/desktop, pages accueil, connexion, inscription, profil, 404, dashboard candidat | P0 |
| P2 | 03 | Données : Dexie (14 tables locales), repositories, migrations PostgreSQL + RLS, couche Supabase paramétrable | P1 |
| P3 | 04 | Administration : 14 modules, éditeur visuel de contenu, gestion questions, import/export JSON/CSV | P1, P2 |
| P4 | 05 | Concours (fiches + filtres), matières, cours, bibliothèque de documents | P2 |
| P5 | 06 | Moteur QCM (4 types de questions), correction, historique, liste de révision | P2, P4 |
| P6 | 07 | Examens blancs : moteur configurable, chrono, notation réelle, reprise d'examen | P5 |
| P7 | 08 | Planning, révision espacée (1/3/7/14/30 j), statistiques et graphiques | P5 |
| P8 | 09 | Sync hybride complète : SyncQueue, conflits, migration anonyme→compte, PWA offline | P2–P7 |
| P9 | 10 | Audit global : TS, ESLint, Vitest, Playwright, build production, rapport d'audit | P1–P8 |
| P10 | 11 | Déploiement web (PWA + variables d'environnement + hébergeur gratuit) et préparation Capacitor/Android | P9 |

Chaque phase se termine par : build vérifié, `PROJECT_STATUS.md` actualisé, documentation des changements importants.

## 3. Modèle de données (résumé — détaillé dans DATABASE_DESIGN.md)

Entités principales : `Ministry`, `Contest`, `ContestRequirement`, `Subject`, `Chapter`, `Lesson`, `Question`, `QuestionOption`, `Document`, `Exam`, `ExamQuestion`, `Attempt`, `AttemptAnswer`, `StudyPlan`, `RevisionItem`, `Favorite`, `SyncQueue` (local), `Announcement`, `ContentRevision`, `Profile`, `AppAdmin` (cloud).

Relations clés :
- Ministry 1—N Contest ; Contest N—N Subject (via `contest_subjects` avec coefficients) ; Contest 1—N ContestRequirement.
- Subject 1—N Chapter 1—N Lesson ; Subject 1—N Question ; Chapter N—N Question (affectation optionnelle).
- Question 1—N QuestionOption ; Exam 1—N ExamQuestion N—1 Question.
- Attempt 1—N AttemptAnswer N—1 Question ; Attempt N—1 Exam ou entraînement libre.
- RevisionItem dérive des erreurs d'AttemptAnswer (PROMPT 06→08).

## 4. Règles de synchronisation locale/cloud

| Données | Origine | Direction | Résolution de conflit |
|---|---|---|---|
| Contenu publié (ministères, concours, matières, chapitres, leçons, questions, documents, examens, annonces) | Admin (cloud) | Cloud → Local | **Serveur référence** ; versionning par `updated_at` + `content_revisions` ; suppressions logiques |
| Tentatives, réponses, favoris, plans, révisions | Candidat (local) | Local → Cloud | Serveur = conservation, pas d'écrasement silencieux : version locale conservée si `updated_at` local plus récent, marquée en conflit pour arbitrage |
| Profil utilisateur | Candidat | Bi-directionnel | Champ par champ, `updated_at` le plus récent gagne, jamais le rôle |
| File d'attente | Local | Éphémère | Opérations conservées jusqu'à confirmation ; jamais de purge sur erreur |

Compléments :
- UUID v4 généré côté client pour toutes les entités synchronisables.
- Connexion anonyme locale : identité locale `local-user` ; à la création de compte, migration des données locales vers `user_id` du profil (jamais d'effacement).
- Mode hors connexion : tout le parcours candidat fonctionne ; seuls l'admin et la publication nécessitent le cloud.

## 5. Risques techniques et solutions gratuites

| Risque | Impact | Solution (gratuite) |
|---|---|---|
| Réseau instable (usage réel au Burkina Faso) | Sync partielle | File d'attente persistante + reprise + délais progressifs |
| Quota IndexedDB | Données perdues | Stocker les métadonnées + cache limité ; jamais de purge automatique |
| Contenu officiel non fourni | Fiches vides | La plateforme accepte les fiches vides et propose l'import admin ; **aucune donnée officielle inventée** (règle 5) ; données de démonstration uniquement en seed local, clairement étiquetées `is_demo` et jamais présentées comme annales officielles |
| Coût cloud | Bloquant si dépassement de l'offre gratuite | Supabase gratuit + compression des charges ; si dépassement : la plateforme reste utilisable hors connexion, seule la sync est dégradée |
| Hébergement gratuit | Coûts variables | Comparaison Netlify/Vercel/GitHub Pages au PROMPT 11 avec contrainte : SPA avec fallback de routes |
| PDF volumineux | Mémoire mobile | Visualisation via URL + téléchargement optionnel ; jamais de PDF massifs embarqués dans le bundle |
| Build Android sur ce téléphone | Lent/interrompu par Android | Préparer la configuration et documenter la génération d'APK ; la compilation sera détaillée au PROMPT 11 |

## 6. Définition de « terminé » par phase

Une fonctionnalité est déclarée terminée uniquement si : elle compile (build de production), elle est testée manuellement sur les parcours prévus, elle fonctionne hors connexion quand applicable, et elle est documentée dans `PROJECT_STATUS.md`. Aucun test fictif n'est jamais déclaré exécuté (règle finale du PROMPT 00).
