import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { getCurrentSession } from '@/services/auth/session';

/**
 * Guard d'authentification : redirige vers la connexion en conservant la destination.
 * ATTENTION (SECURITY_PLAN.md) : ce contrôle frontend sert uniquement d'ergonomie ;
 * l'autorité réelle est la vérification côté serveur (RLS Supabase).
 */
export function RequireAuth() {
  const location = useLocation();
  if (!getCurrentSession()) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}

/**
 * Guard administrateur : réservé aux comptes dont le rôle administrateur est
 * confirmé par le serveur. Aucun contournement local possible : tant que le
 * service cloud n'est pas branché, l'espace admin est verrouillé (état explicite).
 */
export function RequireAdmin() {
  const session = getCurrentSession();
  if (!session) {
    return <Navigate to="/auth/login" replace state={{ from: '/admin' }} />;
  }
  if (!session.isAdmin) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-navy-950 px-4">
        <Card className="w-full max-w-md border-navy-600 bg-navy-900" glow>
          <CardBody className="space-y-4 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-danger-soft text-danger">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="text-lg font-black text-white">Accès administrateur requis</h1>
            <Alert tone="danger">
              Votre compte ne dispose pas du rôle administrateur. Ce rôle est attribué et vérifié
              côté serveur uniquement ; il ne peut pas être modifié depuis l’application.
            </Alert>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full">
                Retour à l’espace candidat
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }
  return <Outlet />;
}
