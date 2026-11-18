/**
 * Service d'authentification — PROMPT 02.
 *
 * Les identifiants Supabase ne sont pas encore fournis (voir PROJECT_STATUS.md) :
 * le service le détecte explicitement et le signale à l'interface, sans jamais
 * simuler une connexion réussie (règle permanente n°4 : pas de maquette à la
 * place d'une vraie fonctionnalité). La couche Supabase réelle sera branchée au
 * PROMPT 03 via les mêmes variables d'environnement.
 */

export type AuthFailure =
  | { ok: true }
  | { ok: false; reason: 'cloud-not-configured' | 'invalid-credentials' | 'network' | 'unknown'; message: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export function isCloudConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function baseFailure(): AuthFailure {
  return {
    ok: false,
    reason: 'cloud-not-configured',
    message:
      'La connexion cloud n’est pas encore configurée sur ce déploiement. ' +
      'L’application reste utilisable hors connexion et vos données locales sont conservées.',
  };
}

/** Connexion avec email et mot de passe. Validation déjà faite par Zod côté formulaire. */
export async function signInWithEmail(_email: string, _password: string): Promise<AuthFailure> {
  if (!isCloudConfigured()) return baseFailure();
  // La couche Supabase sera branchée au PROMPT 03 (aucun simulacre avant).
  return {
    ok: false,
    reason: 'unknown',
    message: 'Le service cloud est configuré mais n’est pas encore branché (phase PROMPT 03).',
  };
}

/** Création de compte avec email et mot de passe. */
export async function signUpWithEmail(_email: string, _password: string, _name: string): Promise<AuthFailure> {
  if (!isCloudConfigured()) return baseFailure();
  return {
    ok: false,
    reason: 'unknown',
    message: 'Le service cloud est configuré mais n’est pas encore branché (phase PROMPT 03).',
  };
}
