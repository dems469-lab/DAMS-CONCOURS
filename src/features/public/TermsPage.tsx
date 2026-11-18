import { PageHeader } from '@/components/ui/PageHeader';

const SECTIONS = [
  {
    title: '1. Objet',
    text: 'Les présentes conditions régissent l’utilisation de DAMS CONCOURS, une plateforme gratuite de préparation aux concours directs de la Fonction publique du Burkina Faso. En utilisant la plateforme, vous acceptez ces conditions.',
  },
  {
    title: '2. Service offert',
    text: 'La plateforme propose des fiches de concours, des cours, des questions d’entraînement, des examens blancs et des outils de suivi personnel. Le service est fourni gratuitement, sans abonnement ni publicité.',
  },
  {
    title: '3. Exactitude des informations',
    text: 'Les informations relatives aux concours sont vérifiées et accompagnées de leurs sources. La plateforme ne remplace pas les textes officiels : seules les publications officielles de l’administration font foi. Une information non vérifiée n’est jamais présentée.',
  },
  {
    title: '4. Compte utilisateur',
    text: 'La création d’un compte est gratuite. Vous êtes responsable de la confidentialité de vos identifiants. Les données de progression vous appartiennent et restent consultables depuis votre profil.',
  },
  {
    title: '5. Utilisation acceptable',
    text: 'Il est interdit de tenter d’accéder aux espaces réservés aux administrateurs sans autorisation, de contourner les mesures de sécurité, ou de réutiliser massivement le contenu à des fins commerciales.',
  },
  {
    title: '6. Évolution du service',
    text: 'Des modules peuvent être en préparation à certaines phases du projet ; ils sont signalés comme tels et ne sont jamais présentés comme fonctionnels.',
  },
] as const;

export function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 py-6 md:py-10">
      <PageHeader
        title="Conditions d’utilisation"
        description="Version en vigueur — s’applique à l’ensemble de la plateforme DAMS CONCOURS."
      />
      {SECTIONS.map(({ title, text }) => (
        <section key={title} className="surface surface-border rounded-2xl border p-5">
          <h2 className="text-sm font-bold">{title}</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted">{text}</p>
        </section>
      ))}
    </div>
  );
}
