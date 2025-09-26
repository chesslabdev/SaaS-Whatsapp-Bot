import { z } from 'zod';

// Generated from your 'Member' Prisma model
export const MemberSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  organization: z.string(),
  userId: z.string(),
  user: z.string(),
  role: z.string(),
  createdAt: z.date(),
});

// Schema for creating a new Member.
// Fields managed by the database (id, createdAt, etc.) are omitted.
export const CreateMemberInputSchema = MemberSchema.omit({
  id: true,
});

// Schema for updating a Member. All fields are optional.
export const UpdateMemberInputSchema = CreateMemberInputSchema.partial();

// Exporting types for convenience
export type Member = z.infer<typeof MemberSchema>;
export type CreateMemberInput = z.infer<typeof CreateMemberInputSchema>;
export type UpdateMemberInput = z.infer<typeof UpdateMemberInputSchema>;
