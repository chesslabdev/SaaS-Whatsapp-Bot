import { z } from 'zod';

// Schema for Invitation based on Better Auth Entity
export const InvitationSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  organizationId: z.string(),
  inviterId: z.string(),
  role: z.array(z.string()), // Array of roles as per diagram
  status: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
});

// Schema for creating a new Invitation
export const CreateInvitationInputSchema = z.object({
  email: z.string().email("Email inválido"),
  organizationId: z.string().optional(), // Optional if using active organization
  role: z.array(z.string()).default(['member']),
});

// Schema for updating a Invitation
export const UpdateInvitationInputSchema = z.object({
  status: z.string().optional(),
  role: z.array(z.string()).optional(),
});

// Exporting types for convenience
export type Invitation = z.infer<typeof InvitationSchema>;
export type CreateInvitationInput = z.infer<typeof CreateInvitationInputSchema>;
export type UpdateInvitationInput = z.infer<typeof UpdateInvitationInputSchema>;
