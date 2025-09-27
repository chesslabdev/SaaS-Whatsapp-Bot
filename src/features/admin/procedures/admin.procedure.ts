import { igniter } from '@/igniter';

export const adminProcedure = igniter.procedure({
  name: 'admin',
  handler: async (_, { context, request }) => {
    // This procedure acts as a repository for admin operations using Better Auth Admin Plugin
    return {
      adminRepository: {
        // User management operations
        createUser: async (email: string, password: string, name?: string, role?: string) => {
          try {
            const result = await context.auth.api.adminCreateUser({
              body: {
                email,
                password,
                name,
                role
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error creating user:', error)
            throw error
          }
        },

        listAllUsers: async () => {
          try {
            const result = await context.auth.api.adminListUsers({
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error listing users:', error)
            throw error
          }
        },

        // User ban/unban operations
        banUser: async (userId: string, reason?: string, banExpires?: Date) => {
          try {
            const result = await context.auth.api.adminBanUser({
              body: {
                userId,
                reason,
                banExpires: banExpires?.toISOString()
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error banning user:', error)
            throw error
          }
        },

        unbanUser: async (userId: string) => {
          try {
            const result = await context.auth.api.adminUnbanUser({
              body: { userId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error unbanning user:', error)
            throw error
          }
        },

        // User removal
        removeUser: async (userId: string) => {
          try {
            const result = await context.auth.api.adminRemoveUser({
              body: { userId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error removing user:', error)
            throw error
          }
        },

        // Session management
        listUserSessions: async (userId: string) => {
          try {
            const result = await context.auth.api.adminListUserSessions({
              query: { userId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error listing user sessions:', error)
            throw error
          }
        },

        revokeUserSession: async (sessionToken: string) => {
          try {
            const result = await context.auth.api.adminRevokeUserSession({
              body: { sessionToken },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error revoking session:', error)
            throw error
          }
        },

        revokeUserSessions: async (userId: string) => {
          try {
            const result = await context.auth.api.adminRevokeUserSessions({
              body: { userId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error revoking user sessions:', error)
            throw error
          }
        },

        // Impersonation
        impersonateUser: async (userId: string) => {
          try {
            const result = await context.auth.api.adminImpersonateUser({
              body: { userId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error impersonating user:', error)
            throw error
          }
        },

        stopImpersonating: async () => {
          try {
            const result = await context.auth.api.adminStopImpersonating({
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error stopping impersonation:', error)
            throw error
          }
        },
      }
    };
  }
});