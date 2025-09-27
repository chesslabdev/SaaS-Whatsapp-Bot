import { igniter } from '@/igniter'
import { authController } from '@/features/auth'
import { organizationController } from '@/features/organization'
import { memberController } from '@/features/member'
import { invitationController } from '@/features/invitation'
import { teamController } from '@/features/team'
import { adminController } from '@/features/admin'
import { billingController } from '@/features/billing'


/**
 * @description Main application router configuration
 * @see https://github.com/felipebarcelospro/igniter-js
 */
export const AppRouter = igniter.router({
  controllers: {
    auth: authController,
    organization: organizationController,
    member: memberController,
    invitation: invitationController,
    team: teamController,
    admin: adminController,
    billing: billingController,
  }
})

export type AppRouterType = typeof AppRouter
