import { igniter } from '@/igniter';
import { z } from 'zod';
import { memberProcedure } from '../procedures/member.procedure'
import { CreateMemberInputSchema, UpdateMemberInputSchema } from '../member.interfaces'

export const memberController = igniter.controller({
  name: 'Member',
  description: 'Endpoints for Members',
  path: '/members',
  actions: {
    // Better Auth organization member operations
    listByOrganization: igniter.query({
      name: 'listByOrganization',
      description: 'List members of an organization',
      path: '/organization',
      query: z.object({
        organizationId: z.string().optional(),
      }),
      use: [memberProcedure()],
      handler: async ({ request, context, response }) => {
        const members = await context.memberRepository.listByOrganization(request.query.organizationId)
        return response.success(members)
      },
    }),

    addToOrganization: igniter.mutation({
      name: 'addToOrganization',
      description: 'Add a member to an organization',
      path: '/organization/add',
      method: 'POST',
      body: z.object({
        userId: z.string(),
        role: z.union([z.string(), z.array(z.string())]).default("member"),
        organizationId: z.string().optional(),
      }),
      use: [memberProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.memberRepository.addToOrganization(
          request.body.userId,
          request.body.role ?? "member",
          request.body.organizationId
        )
        return response.created(result)
      },
    }),

    updateRole: igniter.mutation({
      name: 'updateRole',
      description: 'Update member role in organization',
      path: '/organization/update-role',
      method: 'PUT',
      body: z.object({
        memberId: z.string(),
        role: z.union([z.string(), z.array(z.string())]),
        organizationId: z.string().optional(),
      }),
      use: [memberProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.memberRepository.updateRole(
          request.body.memberId,
          request.body.role,
          request.body.organizationId
        )
        return response.success(result)
      },
    }),

    removeFromOrganization: igniter.mutation({
      name: 'removeFromOrganization',
      description: 'Remove member from organization',
      path: '/organization/remove',
      method: 'DELETE',
      body: z.object({
        memberId: z.string(),
        organizationId: z.string().optional(),
      }),
      use: [memberProcedure()],
      handler: async ({ request, context, response }) => {
        await context.memberRepository.removeFromOrganization(
          request.body.memberId,
          request.body.organizationId
        )
        return response.status(200).noContent()
      },
    }),
  },
})
