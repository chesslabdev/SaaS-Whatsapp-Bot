import { igniter } from '@/igniter'
import { z } from 'zod'
import { billingProcedure } from '../procedures/billing.procedure'
import {
  GetSubscriptionInputSchema,
  UpgradeSubscriptionInputSchema,
  CancelSubscriptionInputSchema,
  RestoreSubscriptionInputSchema,
  CreateBillingPortalInputSchema
} from '../billing.interfaces'

export const billingController = igniter.controller({
  name: 'Billing',
  description: 'Endpoints for Stripe billing and subscription management',
  path: '/billing',
  actions: {
    // Get current subscription status
    getSubscription: igniter.query({
      name: 'getSubscription',
      description: 'Get current subscription details for the user or reference',
      path: '/subscription',
      query: GetSubscriptionInputSchema,
      use: [billingProcedure()],
      handler: async ({ request, context, response }) => {
        const subscription = await context.billingRepository.getSubscription(
          request.query.referenceId
        )
        return response.success(subscription)
      },
    }),

    // Upgrade subscription to a new plan
    upgradeSubscription: igniter.mutation({
      name: 'upgradeSubscription',
      description: 'Upgrade subscription to a different plan',
      path: '/subscription/upgrade',
      method: 'POST',
      body: UpgradeSubscriptionInputSchema,
      use: [billingProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.billingRepository.upgradeSubscription(
          request.body.plan,
          request.body.referenceId
        )
        return response.success(result)
      },
    }),

    // Cancel subscription
    cancelSubscription: igniter.mutation({
      name: 'cancelSubscription',
      description: 'Cancel subscription at the end of the current billing period',
      path: '/subscription/cancel',
      method: 'POST',
      body: CancelSubscriptionInputSchema,
      use: [billingProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.billingRepository.cancelSubscription(
          request.body.returnUrl,
          request.body.subscriptionId,
          request.body.referenceId,
        )
        return response.success(result)
      },
    }),

    // Restore a canceled subscription
    restoreSubscription: igniter.mutation({
      name: 'restoreSubscription',
      description: 'Restore a subscription that was set to cancel at period end',
      path: '/subscription/restore',
      method: 'POST',
      body: RestoreSubscriptionInputSchema,
      use: [billingProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.billingRepository.restoreSubscription(
          request.body.subscriptionId,
          request.body.referenceId
        )
        return response.success(result)
      },
    }),

    // Create billing portal session
    createBillingPortal: igniter.mutation({
      name: 'createBillingPortal',
      description: 'Create a Stripe billing portal session for customer self-service',
      path: '/portal',
      method: 'POST',
      body: CreateBillingPortalInputSchema,
      use: [billingProcedure()],
      handler: async ({ request, context, response }) => {
        const result = await context.billingRepository.createBillingPortalSession(
          request.body.returnUrl,
          request.body.referenceId
        )
        return response.success(result)
      },
    }),
  },
})
