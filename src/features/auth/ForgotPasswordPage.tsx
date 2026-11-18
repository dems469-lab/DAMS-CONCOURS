import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KeyRound, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { isCloudConfigured } from '@/services/auth/authService';

const forgotSchema = z.object({
  email: z.string().min(1, 'L’adresse email est obligatoire.').email('Adresse email invalide.'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({ resolver: zodResolver(forgotSchema) });

  const cloudReady = isCloudConfigured();

  const onSubmit = handleSubmit(async () => {
    // Aucun envoi n'est simulé : l'envoi réel de l'email de réinitialisation
    // passera par Supabase Auth au PROMPT 03.
    setSubmitted(true);
  });

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-500 text-white">
          <KeyRound className="h-7 w-7" />
        </span>
        <h1 className="mt-3 text-xl font-black">Mot de passe oublié</h1>
        <p className="mt-1 text-xs text-muted">
          Saisissez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
      </div>

      <Card glow>
        <CardBody className="space-y-4">
          {!cloudReady && (
            <Alert tone="warning" title="Configuration requise">
              La réinitialisation par email nécessite la configuration du service
              d’authentification, en cours de déploiement. Aucun email fictif n’est envoyé.
            </Alert>
          )}

          {cloudReady && submitted && (
            <Alert tone="success" title="Demande enregistrée">
              Si un compte existe pour cette adresse, un email de réinitialisation vient d’être envoyé.
            </Alert>
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
            <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
              <Mail className="h-4 w-4" />
              Envoyer le lien de réinitialisation
            </Button>
          </form>

          <p className="text-center text-xs text-muted">
            <Link to="/auth/login" className="font-semibold text-electric-500 dark:text-cyan-neon">
              Retour à la connexion
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
