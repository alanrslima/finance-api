import { AuthController } from '../../controllers/auth/AuthController'
import { RefreshTokenController } from '../../controllers/auth/RefreshTokenController'
import { RequestHandler, Router } from 'express'
// import { passportGithub } from '../../strategys/github'
// import { CallbackController } from '../../controllers/auth/CallbackController'

const router = Router()

const authController = new AuthController()
const refreshTokenController = new RefreshTokenController()
// const callbackController = new CallbackController()

router.post('/login', authController.handle as RequestHandler)
router.post('/refresh-token', refreshTokenController.handle as RequestHandler)

// Github OAUTH
// router.get('/github/login', passportGithub.authenticate('oauth2'))
// router.get(
//   '/github/callback',
//   passportGithub.authenticate('oauth2', { failureRedirect: '/login' }),
//   callbackController.handle as RequestHandler
// )

// facebook OAUTH
// router.get('/github/login', passportGithub.authenticate('oauth2'))
// router.get(
//   '/github/callback',
//   passportGithub.authenticate('oauth2', { failureRedirect: '/login' }),
//   callbackController.handle as RequestHandler
// )

export { router as authRouter }
