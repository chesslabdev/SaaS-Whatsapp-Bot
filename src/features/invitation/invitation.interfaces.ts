import { z } from 'zod';

// Generated from your 'Invitation' Prisma model
export const InvitationSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  organization: z.string(),
  email: z.string(),
  role: z.string().nullable(),
  status: z.string(),
  expiresAt: z.date(),
  inviterId: z.string(),
  user: z.string(),
});

// Schema for creating a new Invitation.
// Fields managed by the database (id, createdAt, etc.) are omitted.
export const CreateInvitationInputSchema = InvitationSchema.omit({
  id: true,
});

// Schema for updating a Invitation. All fields are optional.
export const UpdateInvitationInputSchema = CreateInvitationInputSchema.partial();

// Exporting types for convenience
export type Invitation = z.infer<typeof InvitationSchema>;
export type CreateInvitationInput = z.infer<typeof CreateInvitationInputSchema>;
export type UpdateInvitationInput = z.infer<typeof UpdateInvitationInputSchema>;
