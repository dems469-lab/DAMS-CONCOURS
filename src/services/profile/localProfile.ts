/**
 * Profil local du candidat — PROMPT 02.
 *
 * Tant que le cloud n'est pas branché, le profil est conservé localement
 * (localStorage). Aucune donnée n'est inventée : seuls les champs réellement
 * saisis par le candidat sont affichés.
 */

export interface LocalProfile {
  name: string;
  /** Concours préparé : saisie libre pour l'instant, reliée au catalogue au PROMPT 05 */
  targetContest: string;
  updatedAt: string;
}

const KEY = 'dams-local-profile';

export function getLocalProfile(): LocalProfile | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocalProfile;
    if (typeof parsed?.name !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveLocalProfile(data: Omit<LocalProfile, 'updatedAt'>): LocalProfile {
  const profile: LocalProfile = { ...data, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    // Stockage indisponible : le profil reste valable pour la session
  }
  return profile;
}
