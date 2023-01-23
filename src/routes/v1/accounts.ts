import { RequestHandler, Router } from 'express'
import { ensuredAuthenticated } from '../../middlewares/ensuredAuthenticated'
import { GetUserAccountsController } from '../../controllers/account/GetUserAccountsController'
import { CreateUserAccountController } from '../../controllers/account/CreateUserAccountController'

const router = Router()

const getUserAccountsController = new GetUserAccountsController()
const createUserAccountController = new CreateUserAccountController()

router.get(
  '/',
  ensuredAuthenticated(),
  getUserAccountsController.handle as RequestHandler
)
router.post(
  '/',
  ensuredAuthenticated(),
  createUserAccountController.handle as RequestHandler
)

export { router as accountsRouter }
