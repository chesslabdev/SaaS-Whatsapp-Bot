import { igniter } from '@/igniter'

export const billingProcedure = igniter.procedure({
  name: 'billing',
  handler: async (_, { context, request }) => {
    // This procedure acts as a repository, centralizing billing and subscription logic
    // Integrates with Better Auth's Stripe plugin for subscription management
    return {
      billingRepository: {
        // Get current subscription for the authenticated user or reference
        getSubscription: async (referenceId?: string) => {
          try {
            const result = await context.auth.api.listActiveSubscriptions({
              ...(referenceId ? { query: { referenceId } } : {}),
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error getting subscription:', error)
            throw error
          }
        },

        // Upgrade subscription to a new plan
        upgradeSubscription: async (plan: string, referenceId?: string) => {
          try {
            const result = await context.auth.api.upgradeSubscription({
              body: {
                plan,
                referenceId
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error upgrading subscription:', error)
            throw error
          }
        },

        // Cancel subscription at the end of the billing period
        cancelSubscription: async (
          returnUrl: string,
          subscriptionId?: string,
          referenceId?: string,
        ) => {
          try {
            const result = await context.auth.api.cancelSubscription({
              body: {
                returnUrl,
                ...(subscriptionId ? { subscriptionId } : {}),
                ...(referenceId ? { referenceId } : {}),
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error canceling subscription:', error)
            throw error
          }
        },

        // Restore a canceled subscription (before it expires)
        restoreSubscription: async (subscriptionId?: string, referenceId?: string) => {
          try {
            const result = await context.auth.api.restoreSubscription({
              body: {
                subscriptionId,
                referenceId,
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error restoring subscription:', error)
            throw error
          }
        },

        // Create billing portal session for customer self-service
        createBillingPortalSession: async (returnUrl: string, referenceId?: string) => {
          try {
            const result = await context.auth.api.createBillingPortal({
              body: {
                returnUrl,
                referenceId,
              },
              headers: request.headers,
            })
            return result
          } catch (error) {
            console.error('Error creating billing portal session:', error)
            throw error
          }
        },
      }
    }
  }
})
