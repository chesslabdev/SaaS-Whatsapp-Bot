import { igniter } from '@/igniter';

export const memberProcedure = igniter.procedure({
  name: 'member',
  handler: async (_, { context, request }) => {
    // This procedure acts as a repository, centralizing database access logic.
    // Also integrates with Better Auth for organization member management
    return {
      memberRepository: {
        // Better Auth operations for organization members
        listByOrganization: async (organizationId?: string) => {
          try {
            const result = await context.auth.api.listMembers({
              query: { organizationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error listing members:', error)
            throw error
          }
        },

        addToOrganization: async (userId: string, role: string | string[], organizationId?: string) => {
          try {
            const result = await context.auth.api.addMember({
              body: { userId, role: role as "admin" | "member" | "owner" | ("admin" | "member" | "owner")[], organizationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error adding member:', error)
            throw error
          }
        },

        updateRole: async (memberId: string, role: string | string[], organizationId?: string) => {
          try {
            const result = await context.auth.api.updateMemberRole({
              body: {
                memberId,
                role: role as "admin" | "member" | "owner" | ("admin" | "member" | "owner")[],
                organizationId,
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error updating member role:', error)
            throw error
          }
        },

        removeFromOrganization: async (memberId: string, organizationId?: string) => {
          try {
            const result = await context.auth.api.removeMember({
              body: { memberIdOrEmail: memberId, organizationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error removing member:', error)
            throw error
          }
        },
      }
    };
  }
});
