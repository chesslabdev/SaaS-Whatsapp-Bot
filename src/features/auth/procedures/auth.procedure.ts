import { igniter } from '@/igniter'

export const AuthFeatureProcedure = igniter.procedure({
  name: 'AuthFeatureProcedure',

  handler: async (_, { request, context, response }) => ({
    auth: {
      signIn: async (email: string, password: string) => {
        try {
          const result = await context.auth.api.signInEmail({
            body: { email, password },
            headers: request.headers,
          })
          console.log(`Sign in with email: ${email}`)
          return result
        } catch (error) {
          console.error('Error in auth procedure:', error)
          throw error
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        try {
          const result = await context.auth.api.signUpEmail({
            body: { email, password, name },
            headers: request.headers,
          })

          console.log(`Sign up with email: ${email}`)
          return result
        } catch (error) {
          console.error('Error in sign up procedure:', error)
          throw error
        }
      },

      verifySession: async () => {
        try {
          const session = await context.auth.api.getSession({
            headers: request.headers,
          })

          return session
        } catch (error) {
          console.error('Error verifying session:', error)
          return null
        }
      },

      signOut: async () => {
        try {
          const result = await context.auth.api.signOut({
            headers: request.headers,
          })
          return result
        } catch (error) {
          console.error('Error signing out:', error)
          throw error
        }
      }
    }
  }),
})