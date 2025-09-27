import { z } from 'zod';

// Schema for Member based on Better Auth Entity
export const MemberSchema = z.object({
  id: z.string(),
  userId: z.string(),
  organizationId: z.string(),
  role: z.array(z.string()), // Array of roles as per diagram
  createdAt: z.date(),
  // Relations (populated when fetched)
  user: z.any().optional(),
  organization: z.any().optional(),
});

// Schema for creating a new Member
export const CreateMemberInputSchema = z.object({
  userId: z.string(),
  organizationId: z.string().optional(), // Optional if using active organization
  role: z.array(z.string()).default(['member']),
});

// Schema for updating a Member
export const UpdateMemberInputSchema = z.object({
  role: z.array(z.string()).optional(),
});

// Exporting types for convenience
export type Member = z.infer<typeof MemberSchema>;
export type CreateMemberInput = z.infer<typeof CreateMemberInputSchema>;
export type UpdateMemberInput = z.infer<typeof UpdateMemberInputSchema>;
