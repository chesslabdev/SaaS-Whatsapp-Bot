import { igniter } from '@/igniter';
import { z } from 'zod';
import { organizationProcedure } from '../procedures/organization.procedure'

export const organizationController = igniter.controller({
  name: 'Organization',
  description: 'Endpoints for Organizations',
  path: '/organizations',
  actions: {
    // Better Auth organization operations
    createOrganization: igniter.mutation({
      name: 'createOrganization',
      description: 'Create a new organization via Better Auth',
      path: '/create-org',
      method: 'POST',
      body: z.object({
        name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
        slug: z.string().optional(),
      }),
      use: [organizationProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.organizationRepository.createOrganization(
          request.body.name,
          request.body.slug
        )
        return response.created(result)
      },
    }),

    listUserOrganizations: igniter.query({
      name: 'listUserOrganizations',
      description: 'List user organizations',
      path: '/user-orgs',
      use: [organizationProcedure()],
      handler: async ({ context, response }) => {
        const organizations = await context.organizationRepository.listUserOrganizations()
        return response.success(organizations)
      },
    }),

    getActive: igniter.query({
      name: 'getActive',
      description: 'Get active organization',
      path: '/active',
      use: [organizationProcedure()],
      handler: async ({ context, response }) => {
        const organization = await context.organizationRepository.getActive()
        return response.success(organization)
      },
    }),

    setActive: igniter.mutation({
      name: 'setActive',
      description: 'Set active organization',
      path: '/set-active',
      method: 'POST',
      body: z.object({
        organizationId: z.string(),
      }),
      use: [organizationProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.organizationRepository.setActive(request.body.organizationId)
        return response.success(result)
      },
    }),

    updateOrganization: igniter.mutation({
      name: 'updateOrganization',
      description: 'Update organization via Better Auth',
      path: '/update-org',
      method: 'PUT',
      body: z.object({
        organizationId: z.string(),
        name: z.string().min(2).optional(),
        slug: z.string().optional(),
        metadata: z.any().optional(),
      }),
      use: [organizationProcedure()],
      handler: async ({ request, context, response }) => {
        const { organizationId, ...data } = request.body
        const result = await context.organizationRepository.updateOrganization(organizationId, data)
        return response.success(result)
      },
    }),

    deleteOrganization: igniter.mutation({
      name: 'deleteOrganization',
      description: 'Delete organization via Better Auth',
      path: '/delete-org',
      method: 'DELETE',
      body: z.object({
        organizationId: z.string(),
      }),
      use: [organizationProcedure()],
      handler: async ({ request, context, response }) => {
        await context.organizationRepository.deleteOrganization(request.body.organizationId)
        return response.noContent()
      },
    }),

    leave: igniter.mutation({
      name: 'leave',
      description: 'Leave organization',
      path: '/leave',
      method: 'POST',
      body: z.object({
        organizationId: z.string().optional(),
      }),
      use: [organizationProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.organizationRepository.leave(request.body.organizationId || "")
        return response.success(result)
      },
    }),
  },
})
