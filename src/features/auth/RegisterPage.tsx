import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { registerSchema, type RegisterFormData } from './authSchemas';
import { signUpWithEmail } from '@/services/auth/authService';

export function RegisterPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    const result = await signUpWithEmail(data.email, data.password, data.name);
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
        <h1 className="mt-3 text-xl font-black">Créer un compte</h1>
        <p className="mt-1 text-xs text-muted">
          Gratuit, sans abonnement. Vos données de progression restent enregistrées sur votre appareil.
        </p>
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
              label="Nom complet"
              type="text"
              autoComplete="name"
              placeholder="Votre nom et prénom"
              error={errors.name?.message}
              {...register('name')}
            />
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
              autoComplete="new-password"
              placeholder="Au moins 8 caractères"
              hint="Minimum 8 caractères."
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              label="Confirmer le mot de passe"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
              Créer mon compte
            </Button>
          </form>

          <p className="text-center text-xs text-muted">
            Déjà inscrit ?{' '}
            <Link to="/auth/login" className="font-semibold text-electric-500 dark:text-cyan-neon">
              Se connecter
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
