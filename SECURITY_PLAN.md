# SECURITY_PLAN.md — DAMS CONCOURS

> Plan de sécurité. Créé au PROMPT 01, appliqué au PROMPT 03 et audité au PROMPT 10.
> Dernière mise à jour : 2026-11-18.

## 1. Principes

1. **Aucun secret dans le frontend** (règle 6) : seule la clé `anon` Supabase est exposée ; la clé `service_role` ne quitte jamais le serveur (fonctions SQL `security definer` ou scripts d'administration côté serveur uniquement).
2. **RLS activée sur toutes les tables** : aucune table accessible sans politique.
3. **Le rôle administrateur n'est jamais modifiable par le client** : seules des fonctions SQL `SECURITY DEFINER` appartenant au propriétaire de la base peuvent écrire dans `app_admins`, invocables par un admin existant.
4. **Les droits admin sont vérifiés côté serveur** : la fonction `public.is_app_admin()` (stable, vérifie `app_admins` + `profiles.id = auth.uid()`) sert de base à toutes les politiques d'écriture.
5. Aucune dépendance payante, aucun abonnement, aucune publicité → aucune intégration de paiement à sécuriser.

## 2. Modèle de rôles

| Rôle | Définition | Capacités |
|---|---|---|
| `anon` | Visiteur sans compte | Lecture du contenu publié uniquement |
| `candidat` | `profiles.id = auth.uid()` | Lecture contenu publié + CRUD de ses données privées |
| `app_admin` | Ligne dans `app_admins` | Tout le contenu (créer/modifier/publier/supprimer) + lecture des profils ; jamais auto-promotion |

## 3. Politiques RLS (cible, PROMPT 03)

### Contenu pédagogique
- `SELECT` public : `status = 'published' AND deleted_at IS NULL` (admins : tout).
- `INSERT/UPDATE/DELETE` : `is_app_admin()` uniquement.
- Publication = écriture `status='published'` + insertion dans `content_revisions` (via trigger ou fonction), traçable.

### Profils
- Chacun lit et modifie **sa** ligne : `id = auth.uid()`.
- Colonnes sensibles (`role`) : jamais modifiables par le client ; toute modification de rôle passe par une fonction `SECURITY DEFINER` appelée par un admin.
- `app_admins` : pas de politique INSERT/UPDATE/DELETE directe ; gestion via fonction dédiée.

### Données candidat (attempts, attempt_answers, study_plans, study_sessions, revision_items, favorites)
- Toutes les opérations limitées à `user_id = auth.uid()`.
- `attempt_answers` : accès via jointure contrôlée (`EXISTS` sur `attempts.user_id = auth.uid()`) ou dénormalisation de `user_id` avec trigger.

### Tables sans exposition client
`syncQueue` n'existe qu'en local (Dexie), jamais côté cloud.

## 4. Authentification

- Supabase Auth : email/mot de passe (gratuit), éventuellement magic link ; aucune authentification payante.
- Session stockée dans le localStorage géré par le SDK Supabase ; pas de jeton dans le code.
- Inscription : validation Zod côté client + contraintes SQL (email unique, longueur mot de passe) côté serveur.
- Mode local anonyme : identité `local-user` purement locale, sans aucun droit cloud ; migration vers compte à l'inscription (voir DATABASE_DESIGN.md §5.4).

## 5. Sécurité applicative (frontend)

- Validation systématique des entrées par Zod (formulaires, imports JSON/CSV).
- Import admin : prévisualisation + validation + détection de doublons + confirmation avant écriture (PROMPT 04).
- Confirmation obligatoire avant toute suppression, y compris côté admin.
- Liens externes : `rel="noopener noreferrer"` ; documents ouverts via URL vérifiées.
- Aucun `innerHTML` non échappé ; rendu du contenu leçons via un composant de rendu contrôlé.

## 6. Supabase Storage (documents PDF)

- Buckets : contenu public en lecture (`documents`) ; uploads réservés aux admins.
- Vérifier les types MIME (PDF) et la taille ; pas d'exécution de contenu.
- Chaque document porte `source` et `is_official`/`verified` — jamais présenter un document de démonstration comme annale officielle (règle 5 / PROMPT 05).

## 7. Check-list de sécurité avant déploiement (PROMPT 10-11)

- [ ] Aucune clé `service_role` dans le dépôt, le bundle ou `.env` commité (`.env` dans `.gitignore`).
- [ ] RLS activée et testée sur chaque table (tests d'intrusion : un candidat ne peut ni écrire le contenu, ni lire les données d'un autre, ni changer son rôle).
- [ ] Politiques vérifiées par tests SQL automatisés.
- [ ] Pas de fonction `SECURITY DEFINER` accessible publiquement et dangereuse (revue manuelle).
- [ ] En-têtes HTTP (hébergeur) : CSP stricte, X-Content-Type-Options, Referrer-Policy.
- [ ] Sauvegarde/restauration documentée (dump SQL + export local JSON).
