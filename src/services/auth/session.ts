/**
 * État de session courant — PROMPT 02 (préparation Supabase Auth).
 *
 * Aucune session n'est créée tant que l'authentification cloud n'est pas branchée
 * (identifiants Supabase non fournis à ce stade — voir authService.ts). Le type
 * prépare l'intégration du PROMPT 03 sans simuler de connexion.
 */
import { isCloudConfigured } from './authService';

export interface Session {
  userId: string;
  email: string;
  name: string | null;
  /** Rôle confirmé côté serveur uniquement (jamais déduit du client). */
  isAdmin: boolean;
}

export function getCurrentSession(): Session | null {
  // Aucune session tant que Supabase Auth n'est pas branché (PROMPT 03).
  if (!isCloudConfigured()) return null;
  // La lecture réelle de la session Supabase sera ajoutée au PROMPT 03.
  return null;
}
