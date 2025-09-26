import { z } from 'zod';

// Generated from your 'Organization' Prisma model
export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().nullable(),
  logo: z.string().nullable(),
  createdAt: z.date(),
  metadata: z.string().nullable(),
  members: z.string(),
  invitations: z.string(),
});

// Schema for creating a new Organization.
// Fields managed by the database (id, createdAt, etc.) are omitted.
export const CreateOrganizationInputSchema = OrganizationSchema.omit({
  id: true,
});

// Schema for updating a Organization. All fields are optional.
export const UpdateOrganizationInputSchema = CreateOrganizationInputSchema.partial();

// Exporting types for convenience
export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateOrganizationInput = z.infer<typeof CreateOrganizationInputSchema>;
export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationInputSchema>;
