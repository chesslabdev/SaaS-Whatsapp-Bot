import { igniter } from '@/igniter'
import { authController } from '@/features/auth'
import { organizationController } from '@/features/organization'
import { memberController } from '@/features/member'
import { invitationController } from '@/features/invitation'


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
  }
})

export type AppRouterType = typeof AppRouter
