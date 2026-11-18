import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { loginSchema, type LoginFormData } from './authSchemas';
import { signInWithEmail } from '@/services/auth/authService';

export function LoginPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    const result = await signInWithEmail(data.email, data.password);
    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }
    navigate('/dashboard');
  });

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-500 text-white shadow-glow">
          <GraduationCap className="h-7 w-7" />
        </span>
        <h1 className="mt-3 text-xl font-black">Connexion</h1>
        <p className="mt-1 text-xs text-muted">Accédez à votre espace de préparation.</p>
      </div>

      <Card glow>
        <CardBody className="space-y-5">
          {submitError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-danger-soft px-3 py-2.5 text-xs leading-relaxed text-danger"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              {submitError}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <Input
              label="Adresse email"
              type="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Mot de passe"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
            <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
              Se connecter
            </Button>
          </form>

          <p className="text-center text-xs text-muted">
            Pas encore de compte ?{' '}
            <Link to="/auth/register" className="font-semibold text-electric-500 dark:text-cyan-neon">
              Créer un compte
            </Link>
            <span className="mx-1">·</span>
            <Link to="/auth/mot-de-passe-oublie" className="font-semibold text-electric-500 dark:text-cyan-neon">
              Mot de passe oublié ?
            </Link>
          </p>
        </CardBody>
      </Card>

      <Link to="/dashboard" className="block text-center text-xs text-muted underline-offset-4 hover:underline">
        Continuer sans compte (mode local)
      </Link>
    </div>
  );
}
