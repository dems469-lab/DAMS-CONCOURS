# DATABASE_DESIGN.md — DAMS CONCOURS

> Modèle de données. Créé au PROMPT 01. Détaillé et implémenté au PROMPT 03.
> Dernière mise à jour : 2026-11-18.

## 1. Architecture de données hybride

- **Local (Dexie / IndexedDB)** : l'application fonctionne intégralement hors connexion. Toutes les entités y vivent.
- **Cloud (Supabase / PostgreSQL)** : source de vérité pour le contenu publié et sauvegarde des données candidat.

Principes :
1. UUID v4 généré côté client pour toute entité synchronisable.
2. Horodatages `created_at`, `updated_at` (ISO 8601 UTC) partout.
3. Suppressions logiques (`deleted_at`) sur le contenu synchronisable ; suppression physique interdite côté client.
4. Aucune donnée officielle inventée : les tables concours peuvent rester vides jusqu'à injection par un administrateur ou import.

## 2. Tables locales (Dexie, PROMPT 03)

| Table | Champs principaux | Index |
|---|---|---|
| `ministries` | id, name, shortName, description, updatedAt, deletedAt | `name` |
| `contests` | id, ministryId, name, level, category, specialty, description, examFormat, sources[], status(draft/published), updatedAt, deletedAt | `ministryId, status, level, category` |
| `contestRequirements` | id, contestId, type(education/age/nationality/other), label, order | `contestId` |
| `contestSubjects` | id, contestId, subjectId, coefficient | `contestId, subjectId` |
| `subjects` | id, name, kind(general/specialty), description, updatedAt, deletedAt | `name, kind` |
| `chapters` | id, subjectId, title, order, objectives, updatedAt, deletedAt | `subjectId` |
| `lessons` | id, chapterId, title, sections(json), summary, updatedAt, deletedAt | `chapterId` |
| `questions` | id, subjectId, chapterId?, contestId?, type(single/multiple/truefalse/short), statement, difficulty, explanation, source?, status(draft/published), updatedAt, deletedAt | `subjectId, chapterId, contestId, type, difficulty, status` |
| `questionOptions` | id, questionId, label, isCorrect, order | `questionId` |
| `documents` | id, title, ministryId?, contestId?, subjectId?, kind(annual/report/formulary...), sourceUrl, source, verified(bool), isOfficial(bool), updatedAt, deletedAt | `contestId, subjectId, kind` |
| `exams` | id, contestId?, title, durationMin, scoringRule, sections[{subjectId, coefficient, questionCount}], status, updatedAt, deletedAt | `contestId, status` |
| `examQuestions` | id, examId, questionId, order | `examId` |
| `attempts` | id, userId, kind(practice/exam), examId?, subjectId?, contestId?, score, maxScore, percentage, startedAt, submittedAt, durationUsedSec, status(in_progress/submitted/abandoned), updatedAt | `userId, status, startedAt` |
| `attemptAnswers` | id, attemptId, questionId, answer(json), isCorrect, points, updatedAt | `attemptId, questionId` |
| `studyPlans` | id, userId, contestId?, title, startDate, sessions[{date, subjectId, durationMin, done}], updatedAt | `userId` |
| `studySessions` | id, planId?, userId, date, subjectId, durationMin, note, done | `userId, date` |
| `revisionItems` | id, userId, questionId, dueDate, intervalIndex(0..4), lapses, doneAt? | `userId, dueDate` |
| `favorites` | id, userId, entityType(lesson/document/question/contest), entityId, createdAt | `userId, [entityType+entityId]` |
| `syncQueue` | id, op(create/update/delete), entity, entityId, payload, createdAt, status(pending/done/retry/conflict/failed), attempts, lastError, lastAttemptAt | `status, createdAt` |
| `meta` | key/value (dernière sync, version du schéma, identité locale, jetons de progression) | `key` |

## 3. Tables cloud (PostgreSQL / Supabase, PROMPT 03)

Public `app` (contenu) + schémas privés par utilisateur pour les données sensibles :

### Contenu (lecture publique, écriture admin)
`profiles`, `app_admins`, `ministries`, `contests`, `contest_requirements`, `contest_subjects`, `subjects`, `chapters`, `lessons`, `questions`, `question_options`, `documents`, `exams`, `exam_questions`, `announcements`, `content_revisions`.

- `content_revisions` : id, entity, entityId, action(create/update/publish/unpublish/delete), adminId, diff(json), createdAt → **traçabilité des publications** (PROMPT 04).
- Chaque table de contenu porte `status`, `updated_at`, `deleted_at`.

### Données candidat (privées, RLS par user_id)
`attempts`, `attempt_answers`, `study_plans`, `study_sessions`, `revision_items`, `favorites`.

## 4. Relations et index cloud (extrait)

- FK `contests.ministry_id → ministries.id` ; index sur `(status, level, category)`.
- FK `contest_subjects` composite unique `(contest_id, subject_id)` ; index sur les deux colonnes.
- FK `chapters.subject_id → subjects.id` ; `lessons.chapter_id → chapters.id` ; index sur `chapter_id`.
- FK `question_options.question_id → questions.id` ON DELETE CASCADE.
- FK `exam_questions` composite unique `(exam_id, question_id)`.
- FK `attempt_answers.attempt_id → attempts.id` ON DELETE CASCADE ; index `question_id`.
- Index partiel : `CREATE INDEX ... ON contests(status) WHERE deleted_at IS NULL`.
- Index candidat : `attempts(user_id, started_at DESC)`, `revision_items(user_id, due_date)`, `favorites(user_id) UNIQUE (entity_type, entity_id)`.

## 5. Règles de synchronisation (détaillées dans DEVELOPMENT_PLAN.md §4)

1. **Contenu publié** : cloud → local uniquement. Download paginé depuis `updated_at` du dernier passage (table `meta`). Les enregistrements `deleted_at IS NOT NULL` suppriment localement l'entité correspondante (suppression logique propagée).
2. **Données candidat** : local → cloud. Chaque écriture locale crée une entrée `syncQueue` avec id/op/entité/date/statut/tentatives/erreur.
3. **Conflits** :
   - contenu publié : le serveur gagne ;
   - données candidat : jamais d'écrasement silencieux — si le serveur a une version plus récente que la copie locale poussée, l'opération passe en statut `conflict` et les deux versions sont conservées côté serveur (colonne `conflicted_payload`) pour arbitrage ; les données locales ne sont jamais effacées sur erreur de synchronisation (règle PROMPT 09).
4. **Identité** : usage local anonyme (`local-user`) ; à la création d'un compte, ré-affectation de `user_id` sur toutes les données privées locales puis upload (migration à sens unique, vérifiée, non destructive).
5. **idempotence** : la sync envoie l'UUID de l'entité ; `ON CONFLICT (id) DO NOTHING/UPDATE` côté serveur — réessais sans doublons.
6. Retries : 30 s → 1 min → 5 min → 30 min (plafond) ; opération passée en `failed` reste conservée, jamais supprimée.

## 6. Migrations

- **Local** : `db.version(n).stores({...})` Dexie, incrémental et documenté ; changement destructif interdit sans chemin de migration.
- **Cloud** : fichiers SQL numérotés dans `supabase/migrations/`, appliqués dans l'ordre, jamais édités après application ; chaque migration crée/maj RLS en même temps que ses tables (voir SECURITY_PLAN.md).
