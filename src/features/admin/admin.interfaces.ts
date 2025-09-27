import { z } from 'zod';

// Schema for User based on Better Auth Entity
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  emailVerified: z.boolean().default(false),
  banned: z.boolean().default(false),
  banReason: z.string().optional(),
  banExpires: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema for creating a new User (Admin function)
export const CreateUserInputSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().optional(),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  role: z.string().optional(), // Role for organization context
});

// Schema for banning a user
export const BanUserInputSchema = z.object({
  userId: z.string(),
  reason: z.string().optional(),
  banExpires: z.date().optional(),
});

// Schema for impersonating a user
export const ImpersonateUserInputSchema = z.object({
  userId: z.string(),
});

// Schema for removing a user
export const RemoveUserInputSchema = z.object({
  userId: z.string(),
});

// Schema for revoking user sessions
export const RevokeUserSessionsInputSchema = z.object({
  userId: z.string(),
});

// Schema for revoking a specific session
export const RevokeSessionInputSchema = z.object({
  sessionToken: z.string(),
});

// Schema for Session based on Better Auth Entity
export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  expiresAt: z.date(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  activeOrganizationId: z.string().optional(),
  impersonatedBy: z.string().optional(),
  createdAt: z.date(),
});

// Exporting types for convenience
export type User = z.infer<typeof UserSchema>;
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
export type BanUserInput = z.infer<typeof BanUserInputSchema>;
export type ImpersonateUserInput = z.infer<typeof ImpersonateUserInputSchema>;
export type RemoveUserInput = z.infer<typeof RemoveUserInputSchema>;
export type RevokeUserSessionsInput = z.infer<typeof RevokeUserSessionsInputSchema>;
export type RevokeSessionInput = z.infer<typeof RevokeSessionInputSchema>;
export type Session = z.infer<typeof SessionSchema>;