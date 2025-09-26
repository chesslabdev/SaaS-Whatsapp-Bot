import { igniter } from '@/igniter'
import { exampleController } from '@/features/example'
import { authController } from '@/features/auth'


/**
 * @description Main application router configuration
 * @see https://github.com/felipebarcelospro/igniter-js
 */
export const AppRouter = igniter.router({
  controllers: {
    example: exampleController,
    auth: authController,

  }
})

export type AppRouterType = typeof AppRouter
