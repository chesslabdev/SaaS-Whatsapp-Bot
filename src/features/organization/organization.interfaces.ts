import { z } from 'zod';

// Enum for PlanType
export const PlanTypeSchema = z.enum(['TRIAL', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE']);

// Schema for ConfigOrganization
export const ConfigOrganizationSchema = z.object({
  tempoAlertaPadrao: z.number().optional(),
  palavrasChaveGlobais: z.array(z.string()).optional(),
  horarioMonitoramento: z.any().optional(), // HorarioConfig type would be defined elsewhere
  iaHabilitada: z.boolean().default(false),
  webhookUrl: z.string().optional(),
});

// Schema for Organization based on Better Auth Entity with custom fields
export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().nullable(),
  logo: z.string().nullable(),
  metadata: z.any().nullable(), // JSON type
  createdAt: z.date(),
  // Custom fields from diagram
  plano: PlanTypeSchema.default('TRIAL'),
  onboardingCompleto: z.boolean().default(false),
  whatsappConectado: z.boolean().default(false),
  limiteUsuarios: z.number().default(5),
  limiteGrupos: z.number().default(3),
  configuracao: ConfigOrganizationSchema.optional(),
});

// Schema for creating a new Organization
export const CreateOrganizationInputSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z.string().optional(),
  logo: z.string().optional(),
  plano: PlanTypeSchema.optional(),
  limiteUsuarios: z.number().optional(),
  limiteGrupos: z.number().optional(),
  configuracao: ConfigOrganizationSchema.optional(),
});

// Schema for updating a Organization. All fields are optional.
export const UpdateOrganizationInputSchema = CreateOrganizationInputSchema.partial();

// Exporting types for convenience
export type PlanType = z.infer<typeof PlanTypeSchema>;
export type ConfigOrganization = z.infer<typeof ConfigOrganizationSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateOrganizationInput = z.infer<typeof CreateOrganizationInputSchema>;
export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationInputSchema>;
