import { z } from 'zod';

// Schema for ConfigEquipe
export const ConfigEquipeSchema = z.object({
  gatilhosCustomizados: z.array(z.any()).optional(), // Gatilho type would be defined elsewhere
  prioridadePadrao: z.string().optional(),
  slaResposta: z.number().optional(),
  headUserId: z.string().optional(),
});

// Schema for Team based on Better Auth Entity with custom fields
export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  organizationId: z.string(),
  createdAt: z.date(),
  // Custom fields from diagram
  gruposAtribuidos: z.array(z.string()).optional(),
  configuracaoEquipe: ConfigEquipeSchema.optional(),
});

// Schema for creating a new Team
export const CreateTeamInputSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  organizationId: z.string().optional(), // Optional because it can use active organization
  gruposAtribuidos: z.array(z.string()).optional(),
  configuracaoEquipe: ConfigEquipeSchema.optional(),
});

// Schema for updating a Team. All fields are optional.
export const UpdateTeamInputSchema = z.object({
  name: z.string().min(2).optional(),
  gruposAtribuidos: z.array(z.string()).optional(),
  configuracaoEquipe: ConfigEquipeSchema.optional(),
});

// Schema for TeamMember based on Better Auth Entity
export const TeamMemberSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

// Exporting types for convenience
export type ConfigEquipe = z.infer<typeof ConfigEquipeSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type CreateTeamInput = z.infer<typeof CreateTeamInputSchema>;
export type UpdateTeamInput = z.infer<typeof UpdateTeamInputSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
