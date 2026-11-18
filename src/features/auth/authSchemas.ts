import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'L’adresse email est obligatoire.').email('Adresse email invalide.'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères.'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Les deux mots de passe ne correspondent pas.',
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
