import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CloudOff, GraduationCap, Save, ShieldCheck, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { getLocalProfile, saveLocalProfile } from '@/services/profile/localProfile';
import { isCloudConfigured } from '@/services/auth/authService';

const profileSchema = z.object({
  name: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères.'),
  targetContest: z.string().trim(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfilePage() {
  const { showToast } = useToast();
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({ resolver: zodResolver(profileSchema) });

  useEffect(() => {
    const profile = getLocalProfile();
    if (profile) {
      reset({ name: profile.name, targetContest: profile.targetContest });
      setSavedAt(profile.updatedAt);
    }
  }, [reset]);

  const onSubmit = handleSubmit((data) => {
    const saved = saveLocalProfile(data);
    setSavedAt(saved.updatedAt);
    reset(data, { keepDirty: false });
    showToast('Profil enregistré sur cet appareil.', 'success');
  });

  const cloudReady = isCloudConfigured();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Mon profil"
        description="Vos informations personnelles. Elles restent enregistrées sur cet appareil jusqu'à la connexion de votre compte."
      />

      {!cloudReady && (
        <Alert tone="info" title="Mode local">
          <span className="flex items-start gap-1.5">
            <CloudOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Le service cloud n’est pas encore configuré sur ce déploiement. Votre profil et votre
            progression sont conservés sur cet appareil, puis migrés vers votre compte dès sa création.
          </span>
        </Alert>
      )}

      <Card glow>
        <CardHeader title="Informations personnelles" icon={<UserRound className="h-5 w-5" />} />
        <CardBody>
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
              label="Concours préparé"
              type="text"
              placeholder="Ex. : Inspecteur… (relié au catalogue prochainement)"
              hint="Ce champ sera relié au catalogue des concours au PROMPT 05."
              error={errors.targetContest?.message}
              {...register('targetContest')}
            />
            <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          </form>
          {savedAt && (
            <p className="mt-3 text-[11px] text-muted">
              Dernier enregistrement local : {new Date(savedAt).toLocaleString('fr-FR')}
            </p>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Compte et sécurité" icon={<ShieldCheck className="h-5 w-5" />} />
        <CardBody className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold">Connexion cloud</p>
              <p className="text-[11px] text-muted">
                {cloudReady ? 'Service disponible — connectez-vous pour synchroniser.' : 'Non configurée sur ce déploiement.'}
              </p>
            </div>
            <Badge tone={cloudReady ? 'success' : 'info'}>{cloudReady ? 'Disponible' : 'À venir'}</Badge>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold">Rôle</p>
              <p className="text-[11px] text-muted">Candidat. Les rôles sont attribués et vérifiés côté serveur uniquement.</p>
            </div>
            <Badge tone="info">
              <GraduationCap className="h-3 w-3" />
              Candidat
            </Badge>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
