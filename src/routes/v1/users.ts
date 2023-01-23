import { CreateUserAccessControlListController } from '../../controllers/user/CreateUserAccessControlListController'
import { CreateUserController } from '../../controllers/user/CreateUserController'
import { RequestHandler, Router } from 'express'
import { ensuredAuthenticated } from '../../middlewares/ensuredAuthenticated'
import { GetUserController } from '../../controllers/user/GetUserController'
import { EditUserController } from '../../controllers/user/EditUserController'
import { DeleteUserController } from '../../controllers/user/DeleteUserController'

const router = Router()
const createUserController = new CreateUserController()
const editUserController = new EditUserController()
const getUserController = new GetUserController()
const deleteUserController = new DeleteUserController()
const createUserAccessControlListController =
  new CreateUserAccessControlListController()

router.post('/', createUserController.handle as RequestHandler)

router.post(
  '/acl',
  ensuredAuthenticated(),
  createUserAccessControlListController.handle as RequestHandler
)

router.get(
  '/me',
  ensuredAuthenticated(),
  getUserController.handle as RequestHandler
)

router.put(
  '/:id',
  ensuredAuthenticated(),
  editUserController.handle as RequestHandler
)

router.delete(
  '/:id',
  ensuredAuthenticated(),
  deleteUserController.handle as RequestHandler
)

export { router as usersRouter }
