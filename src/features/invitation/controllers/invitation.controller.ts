import { igniter } from '@/igniter';
import { z } from 'zod';
import { invitationProcedure } from '../procedures/invitation.procedure'
import { CreateInvitationInputSchema, UpdateInvitationInputSchema } from '../invitation.interfaces'

export const invitationController = igniter.controller({
  name: 'Invitation',
  description: 'Endpoints for Invitations',
  path: '/invitations',
  actions: {
    // Better Auth organization invitation operations
    send: igniter.mutation({
      name: 'send',
      description: 'Send organization invitation',
      path: '/send',
      method: 'POST',
      body: z.object({
        email: z.string().email("Email inválido"),
        role: z.union([z.string(), z.array(z.string())]).default("member"),
        organizationId: z.string().optional(),
      }),
      use: [invitationProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.invitationRepository.send(
          request.body.email,
          request.body.role ?? "member",
          request.body.organizationId
        )
        return response.created(result)
      },
    }),

    listByOrganization: igniter.query({
      name: 'listByOrganization',
      description: 'List organization invitations',
      path: '/organization',
      query: z.object({
        organizationId: z.string().optional(),
      }),
      use: [invitationProcedure()],
      handler: async ({ request, context, response }) => {
        const invitations = await context.invitationRepository.listByOrganization(request.query.organizationId)
        return response.success(invitations)
      },
    }),

    cancel: igniter.mutation({
      name: 'cancel',
      description: 'Cancel invitation',
      path: '/cancel',
      method: 'DELETE',
      body: z.object({
        invitationId: z.string(),
      }),
      use: [invitationProcedure()],
      handler: async ({ request, context, response }) => {
        await context.invitationRepository.cancel(request.body.invitationId)
        return response.status(200).noContent()
      },
    }),

    accept: igniter.mutation({
      name: 'accept',
      description: 'Accept invitation',
      path: '/accept',
      method: 'POST',
      body: z.object({
        invitationId: z.string(),
      }),
      use: [invitationProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.invitationRepository.accept(request.body.invitationId)
        return response.success(result)
      },
    }),

    reject: igniter.mutation({
      name: 'reject',
      description: 'Reject invitation',
      path: '/reject',
      method: 'POST',
      body: z.object({
        invitationId: z.string(),
      }),
      use: [invitationProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.invitationRepository.reject(request.body.invitationId)
        return response.success(result)
      },
    }),
  },
})
