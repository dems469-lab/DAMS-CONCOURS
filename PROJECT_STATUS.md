# PROJECT_STATUS.md — DAMS CONCOURS

> État du projet. Actualisé à la fin de chaque intervention (règle 16).
> Dernière mise à jour : 2026-11-18 — PROMPT 01 (AUDIT ET PLAN TECHNIQUE).

## Phase actuelle

**PROMPT 01 — AUDIT ET PLAN TECHNIQUE : TERMINÉ** (prochaine étape : PROMPT 02 — FONDATIONS ET INTERFACE).

## Environnement

| Élément | Valeur |
|---|---|
| Node.js | v24.21.0 ✅ |
| npm | 11.19.0 ✅ |
| Git | 2.43.0 ✅ |
| Registre npm | accessible ✅ |
| Clés Supabase | ❌ non fournies → mode de développement local (variables d'environnement préparées) |
| Dépôt GitHub | https://github.com/dems469-lab/DAMS-CONCOURS (public) |
| CI GitHub Actions | ✅ workflow `ci.yml` (build de production à chaque push) |

## Livrables du PROMPT 01

- [x] `PROJECT_ARCHITECTURE.md` — stack, structure de dossiers, relations entre modules, décisions d'architecture, flux de sync (résumé), risques.
- [x] `PROJECT_STATUS.md` — ce document.
- [x] `DEVELOPMENT_PLAN.md` — audit d'environnement, phases P0→P10, règles de sync, risques et solutions gratuites, définition de « terminé ».
- [x] `DATABASE_DESIGN.md` — 19 tables locales Dexie + tables cloud PostgreSQL, relations, index, règles de synchronisation et de conflit, migrations.
- [x] `SECURITY_PLAN.md` — rôles, politiques RLS cibles, authentification, storage, check-list avant déploiement.

## Décisions prises

1. Stack : React 19 + TypeScript + Vite + Tailwind CSS + React Router + Lucide + React Hook Form + Zod + Dexie + Supabase + `vite-plugin-pwa` (+ Capacitor au PROMPT 11).
2. Offline-first : écritures candidat d'abord en local (Dexie), file `syncQueue`, puis push cloud. Serveur = référence pour le contenu publié.
3. Mode de développement local tant que les identifiants Supabase ne sont pas fournis ; aucune fonctionnalité remplacée par une maquette.
4. UUID v4 côté client, suppressions logiques, versionnement `updated_at`, traçabilité des publications via `content_revisions`.
5. La compilation est exécutée sur GitHub (Actions) à chaque push, comme demandé par le client.

## Non fait / restant

- PROMPT 02 : fondations et interface (prêt à démarrer).
- Identifiants Supabase à fournir par le client pour la partie cloud (PROMPT 03).
- Aucune compilation locale nécessaire à ce stade (dépôt en phase planification ; le build se fera sur GitHub dès le PROMPT 02).

## Rappel des règles permanentes appliquées

Règles 1–2 (lecture des documents avant intervention) : créés à cette session. Règle 5 (aucune donnée officielle fictive) : intégrée au modèle (fiches vides autorisées, seed démo étiqueté `is_demo`). Règles 6–7 (sécurité) : SECURITY_PLAN.md. Règles 10–11 (gratuit, sans abonnement/publicité) : respectées par la stack. Règle 16 : ce fichier actualisé.
