import { igniter } from '@/igniter';

export const invitationProcedure = igniter.procedure({
  name: 'invitation',
  handler: async (_, { context, request }) => {
    // This procedure acts as a repository, centralizing database access logic.
    // Also integrates with Better Auth for organization invitation management
    return {
      invitationRepository: {
        // Better Auth operations for organization invitations
        send: async (email: string, role: string | string[], organizationId?: string) => {
          try {
            const result = await context.auth.api.createInvitation({
              body: { 
                email, 
                role: role as "admin" | "member" | "owner" | ("admin" | "member" | "owner")[],
                organizationId: organizationId,
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error sending invitation:', error)
            throw error
          }
        },

        listByOrganization: async (organizationId?: string) => {
          try {
            const result = await context.auth.api.listInvitations({
              query: organizationId ? { organizationId } : undefined,
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error listing invitations:', error)
            throw error
          }
        },

        cancel: async (invitationId: string) => {
          try {
            const result = await context.auth.api.cancelInvitation({
              body: { invitationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error cancelling invitation:', error)
            throw error
          }
        },

        accept: async (invitationId: string) => {
          try {
            const result = await context.auth.api.acceptInvitation({
              body: { invitationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error accepting invitation:', error)
            throw error
          }
        },

        reject: async (invitationId: string) => {
          try {
            const result = await context.auth.api.rejectInvitation({
              body: { invitationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error rejecting invitation:', error)
            throw error
          }
        },
      }
    };
  }
});
