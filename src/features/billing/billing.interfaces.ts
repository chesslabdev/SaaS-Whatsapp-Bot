import { z } from 'zod'

// Schema for getting subscription
export const GetSubscriptionInputSchema = z.object({
  referenceId: z.string().optional().describe('The reference ID to get subscription for (e.g., organization ID)')
})

// Schema for upgrading subscription
export const UpgradeSubscriptionInputSchema = z.object({
  plan: z.enum(['Free', 'Pro']).describe('The plan to upgrade to'),
  referenceId: z.string().optional().describe('The reference ID for the subscription (e.g., organization ID)')
})

// Schema for canceling subscription
export const CancelSubscriptionInputSchema = z.object({
  returnUrl: z.string().url().describe('URL to redirect back to after canceling'),
  subscriptionId: z.string().optional().describe('The Stripe subscription ID to cancel'),
  referenceId: z.string().optional().describe('The reference ID for the subscription (e.g., organization ID)')
})

// Schema for restoring subscription
export const RestoreSubscriptionInputSchema = z.object({
  subscriptionId: z.string().optional().describe('The Stripe subscription ID to restore'),
  referenceId: z.string().optional().describe('The reference ID for the subscription (e.g., organization ID)')
})

// Schema for creating billing portal session
export const CreateBillingPortalInputSchema = z.object({
  returnUrl: z.string().url().describe('URL to return to after billing portal session'),
  referenceId: z.string().optional().describe('The reference ID for the subscription (e.g., organization ID)')
})

// Type exports
export type GetSubscriptionInput = z.infer<typeof GetSubscriptionInputSchema>
export type UpgradeSubscriptionInput = z.infer<typeof UpgradeSubscriptionInputSchema>
export type CancelSubscriptionInput = z.infer<typeof CancelSubscriptionInputSchema>
export type RestoreSubscriptionInput = z.infer<typeof RestoreSubscriptionInputSchema>
export type CreateBillingPortalInput = z.infer<typeof CreateBillingPortalInputSchema>
