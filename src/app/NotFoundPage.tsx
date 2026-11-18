import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-navy-950 px-4 text-offwhite">
      <Card className="w-full max-w-md border-navy-600 bg-navy-900 text-center" glow>
        <CardBody className="space-y-4 py-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-500/15 text-cyan-neon">
            <Compass className="h-7 w-7" />
          </span>
          <p className="text-4xl font-black tracking-tight">404</p>
          <p className="text-sm font-bold">Page introuvable</p>
          <p className="mx-auto max-w-xs text-xs leading-relaxed text-grayblue-400">
            La page demandée n’existe pas ou a été déplacée. Vérifiez l’adresse ou revenez à l’accueil.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link to="/">
              <Button className="w-full sm:w-auto">Retour à l’accueil</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full sm:w-auto">
                Mon tableau de bord
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
