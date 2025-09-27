import { igniter } from '@/igniter';

export const teamProcedure = igniter.procedure({
  name: 'team',
  handler: async (_, { context, request }) => {
    // This procedure acts as a repository, centralizing database access logic.
    // Also integrates with Better Auth for team management within organizations
    return {
      teamRepository: {
        // Better Auth operations for teams
        create: async (name: string, organizationId?: string) => {
          try {
            const result = await context.auth.api.createTeam({
              body: {
                name,
                organizationId
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error creating team:', error)
            throw error
          }
        },

        list: async (organizationId?: string) => {
          try {
            const result = await context.auth.api.listOrganizationTeams({
              query: organizationId ? { organizationId } : undefined,
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error listing teams:', error)
            throw error
          }
        },

        update: async (teamId: string, data: { name?: string }) => {
          try {
            const result = await context.auth.api.updateTeam({
              body: {
                teamId,
                data
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error updating team:', error)
            throw error
          }
        },

        delete: async (teamId: string, organizationId?: string) => {
          try {
            const result = await context.auth.api.removeTeam({
              body: { teamId, organizationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error deleting team:', error)
            throw error
          }
        },

        // Active team management
        setActive: async (teamId?: string) => {
          try {
            const result = await context.auth.api.setActiveTeam({
              body: { teamId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error setting active team:', error)
            throw error
          }
        },

        getActive: async () => {
          try {
            const result = await context.auth.api.setActiveTeam({
              body: {},
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error getting active team:', error)
            throw error
          }
        },

        // User teams
        listUserTeams: async () => {
          try {
            const result = await context.auth.api.listUserTeams({
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error listing user teams:', error)
            throw error
          }
        },

        // Team members management
        addMember: async (teamId: string, userId: string) => {
          try {
            const result = await context.auth.api.addTeamMember({
              body: {
                teamId,
                userId
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error adding team member:', error)
            throw error
          }
        },

        removeMember: async (teamId: string, userId: string) => {
          try {
            const result = await context.auth.api.removeTeamMember({
              body: {
                teamId,
                userId
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error removing team member:', error)
            throw error
          }
        },

        listMembers: async (teamId: string) => {
          try {
            const result = await context.auth.api.listTeamMembers({
              query: { teamId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error listing team members:', error)
            throw error
          }
        },
      }
    };
  }
});
