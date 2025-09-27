import { igniter } from '@/igniter'
import { z } from 'zod'
import { adminProcedure } from '../procedures/admin.procedure'
import {
  CreateUserInputSchema,
  BanUserInputSchema,
  ImpersonateUserInputSchema,
  RemoveUserInputSchema,
  RevokeUserSessionsInputSchema,
  RevokeSessionInputSchema
} from '../admin.interfaces'

export const adminController = igniter.controller({
  name: 'Admin',
  description: 'Admin operations for user management',
  path: '/admin',
  actions: {
    // Create user
    createUser: igniter.mutation({
      name: 'createUser',
      description: 'Create a new user (admin only)',
      path: '/create-user',
      method: 'POST',
      body: CreateUserInputSchema,
      use: [adminProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.adminRepository.createUser(
          request.body.email,
          request.body.password,
          request.body.name,
          request.body.role
        )
        return response.created(result)
      },
    }),

    // List all users
    listUsers: igniter.query({
      name: 'listUsers',
      description: 'List all users (admin only)',
      path: '/users',
      use: [adminProcedure()],
      handler: async ({ context, response }) => {
        const users = await context.adminRepository.listAllUsers()
        return response.success(users)
      },
    }),

    // Ban user
    banUser: igniter.mutation({
      name: 'banUser',
      description: 'Ban a user',
      path: '/ban-user',
      method: 'POST',
      body: BanUserInputSchema,
      use: [adminProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.adminRepository.banUser(
          request.body.userId,
          request.body.reason,
          request.body.banExpires
        )
        return response.success(result)
      },
    }),

    // Unban user
    unbanUser: igniter.mutation({
      name: 'unbanUser',
      description: 'Unban a user',
      path: '/unban-user',
      method: 'POST',
      body: z.object({
        userId: z.string(),
      }),
      use: [adminProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.adminRepository.unbanUser(request.body.userId)
        return response.success(result)
      },
    }),

    // Remove user
    removeUser: igniter.mutation({
      name: 'removeUser',
      description: 'Permanently remove a user',
      path: '/remove-user',
      method: 'DELETE',
      body: RemoveUserInputSchema,
      use: [adminProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.adminRepository.removeUser(request.body.userId)
        return response.success(result)
      },
    }),

    // List user sessions
    listUserSessions: igniter.query({
      name: 'listUserSessions',
      description: 'List all sessions for a user',
      path: '/user-sessions',
      query: z.object({
        userId: z.string(),
      }),
      use: [adminProcedure()],
      handler: async ({ request, context, response }) => {
        const sessions = await context.adminRepository.listUserSessions(request.query.userId)
        return response.success(sessions)
      },
    }),

    // Revoke specific session
    revokeSession: igniter.mutation({
      name: 'revokeSession',
      description: 'Revoke a specific session',
      path: '/revoke-session',
      method: 'POST',
      body: RevokeSessionInputSchema,
      use: [adminProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.adminRepository.revokeUserSession(request.body.sessionToken)
        return response.success(result)
      },
    }),

    // Revoke all user sessions
    revokeUserSessions: igniter.mutation({
      name: 'revokeUserSessions',
      description: 'Revoke all sessions for a user',
      path: '/revoke-user-sessions',
      method: 'POST',
      body: RevokeUserSessionsInputSchema,
      use: [adminProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.adminRepository.revokeUserSessions(request.body.userId)
        return response.success(result)
      },
    }),

    // Impersonate user
    impersonateUser: igniter.mutation({
      name: 'impersonateUser',
      description: 'Start impersonating a user',
      path: '/impersonate',
      method: 'POST',
      body: ImpersonateUserInputSchema,
      use: [adminProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.adminRepository.impersonateUser(request.body.userId)
        return response.success(result)
      },
    }),

    // Stop impersonating
    stopImpersonating: igniter.mutation({
      name: 'stopImpersonating',
      description: 'Stop impersonating and return to admin account',
      path: '/stop-impersonating',
      method: 'POST',
      use: [adminProcedure()],
      handler: async ({ context, response }) => {
        const result = await context.adminRepository.stopImpersonating()
        return response.success(result)
      },
    }),
  },
})