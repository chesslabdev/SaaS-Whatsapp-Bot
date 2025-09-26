import { igniter } from '@/igniter'
import { z } from 'zod'
import { AuthFeatureProcedure } from '../procedures/auth.procedure'

export const authController = igniter.controller({
  name: 'auth',
  path: '/auth',
  actions: {
    signIn: igniter.mutation({
      path: "/sign-in",
      method: "POST",
      use: [AuthFeatureProcedure()],
      body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.auth.signIn(request.body.email, request.body.password)
        return response.success(result)
      }
    }),

    signUp: igniter.mutation({
      path: "/sign-up",
      method: "POST",
      use: [AuthFeatureProcedure()],
      body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.auth.signUp(request.body.email, request.body.password, request.body.name)
        return response.success(result)
      }
    }),

    session: igniter.query({
      path: "/session",
      method: "GET",
      use: [AuthFeatureProcedure()],
      handler: async ({ response, context }) => {
        const session = await context.auth.verifySession()
        return response.success({ session })
      }
    }),

    signOut: igniter.mutation({
      path: "/sign-out",
      method: "POST",
      use: [AuthFeatureProcedure()],
      handler: async ({ response, context }) => {
        const result = await context.auth.signOut()
        return response.success(result)
      }
    })
  },
})
