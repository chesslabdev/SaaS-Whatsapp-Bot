import { igniter } from '@/igniter'
import { z } from 'zod'
import { teamProcedure } from '../procedures/team.procedure'
import { CreateTeamInputSchema, UpdateTeamInputSchema } from '../team.interfaces'

export const teamController = igniter.controller({
  name: 'Team',
  description: 'Endpoints for Teams',
  path: '/teams',
  actions: {
    // Create team
    create: igniter.mutation({
      name: 'create',
      description: 'Create a new team in organization',
      path: '/create',
      method: 'POST',
      body: CreateTeamInputSchema,
      use: [teamProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.teamRepository.create(
          request.body.name,
          request.body.organizationId
        )
        return response.created(result)
      },
    }),

    // List teams in organization
    list: igniter.query({
      name: 'list',
      description: 'List all teams in organization',
      path: '/list',
      query: z.object({
        organizationId: z.string().optional(),
      }),
      use: [teamProcedure()],
      handler: async ({ request, context, response }) => {
        const teams = await context.teamRepository.list(request.query?.organizationId)
        return response.success(teams)
      },
    }),

    // Update team
    update: igniter.mutation({
      name: 'update',
      description: 'Update team details',
      path: '/update',
      method: 'PUT',
      body: z.object({
        teamId: z.string(),
        data: UpdateTeamInputSchema,
      }),
      use: [teamProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.teamRepository.update(
          request.body.teamId,
          request.body.data
        )
        return response.success(result)
      },
    }),

    // Delete team
    delete: igniter.mutation({
      name: 'delete',
      description: 'Delete a team',
      path: '/delete',
      method: 'DELETE',
      body: z.object({
        teamId: z.string(),
      }),
      use: [teamProcedure()],
      handler: async ({ request, context, response }) => {
        await context.teamRepository.delete(request.body.teamId)
        return response.status(200).noContent()
      },
    }),

    // Set active team
    setActive: igniter.mutation({
      name: 'setActive',
      description: 'Set active team for user',
      path: '/set-active',
      method: 'POST',
      body: z.object({
        teamId: z.string().optional(), // Optional to unset active team
      }),
      use: [teamProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.teamRepository.setActive(request.body.teamId)
        return response.success(result)
      },
    }),

    // Get active team
    getActive: igniter.query({
      name: 'getActive',
      description: 'Get current active team',
      path: '/active',
      use: [teamProcedure()],
      handler: async ({ context, response }) => {
        const team = await context.teamRepository.getActive()
        return response.success(team)
      },
    }),

    // List user teams
    listUserTeams: igniter.query({
      name: 'listUserTeams',
      description: 'List all teams user belongs to',
      path: '/user-teams',
      use: [teamProcedure()],
      handler: async ({ context, response }) => {
        const teams = await context.teamRepository.listUserTeams()
        return response.success(teams)
      },
    }),

    // Add team member
    addMember: igniter.mutation({
      name: 'addMember',
      description: 'Add member to team',
      path: '/add-member',
      method: 'POST',
      body: z.object({
        teamId: z.string(),
        userId: z.string(),
      }),
      use: [teamProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.teamRepository.addMember(
          request.body.teamId,
          request.body.userId
        )
        return response.created(result)
      },
    }),

    // Remove team member
    removeMember: igniter.mutation({
      name: 'removeMember',
      description: 'Remove member from team',
      path: '/remove-member',
      method: 'DELETE',
      body: z.object({
        teamId: z.string(),
        userId: z.string(),
      }),
      use: [teamProcedure()],
      handler: async ({ request, context, response }) => {
        await context.teamRepository.removeMember(
          request.body.teamId,
          request.body.userId
        )
        return response.status(200).noContent()
      },
    }),

    // List team members
    listMembers: igniter.query({
      name: 'listMembers',
      description: 'List all members of a team',
      path: '/members',
      query: z.object({
        teamId: z.string(),
      }),
      use: [teamProcedure()],
      handler: async ({ request, context, response }) => {
        const members = await context.teamRepository.listMembers(request.query.teamId)
        return response.success(members)
      },
    }),
  },
})
