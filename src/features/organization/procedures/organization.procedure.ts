import { igniter } from '@/igniter';

export const organizationProcedure = igniter.procedure({
  name: 'organization',
  handler: async (_, { context, request }) => {
    // This procedure acts as a repository, centralizing database access logic.
    // Also integrates with Better Auth for organization management
    return {
      organizationRepository: {
        // Better Auth operations for organizations
        createOrganization: async (name: string, slug?: string) => {
          try {
            const result = await context.auth.api.createOrganization({
              body: { name, slug: slug || name.toLowerCase().replace(/\s+/g, '-') },

              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error creating organization:', error)
            throw error
          }
        },

        listUserOrganizations: async () => {
          try {
            const result = await context.auth.api.listOrganizations({
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error listing organizations:', error)
            throw error
          }
        },

        getActive: async () => {
          try {
            const result = await context.auth.api.getFullOrganization({
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error getting active organization:', error)
            throw error
          }
        },

        setActive: async (organizationId: string) => {
          try {
            const result = await context.auth.api.setActiveOrganization({
              body: { organizationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error setting active organization:', error)
            throw error
          }
        },

        updateOrganization: async (organizationId: string, data: { name?: string; slug?: string; metadata?: any }) => {
          try {
            const result = await context.auth.api.updateOrganization({
              body: { organizationId, data },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error updating organization:', error)
            throw error
          }
        },

        deleteOrganization: async (organizationId: string) => {
          try {
            const result = await context.auth.api.deleteOrganization({
              body: { organizationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error deleting organization:', error)
            throw error
          }
        },

        leave: async (organizationId: string) => {
          try {
            const result = await context.auth.api.leaveOrganization({
              body: { organizationId },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error leaving organization:', error)
            throw error
          }
        },
      }
    };
  }
});
