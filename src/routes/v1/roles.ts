import { CreateRoleController } from '../../controllers/role/CreateRoleController'
import { CreateRolePermissionController } from '../../controllers/role/CreateRolePermissionController'
import { RequestHandler, Router } from 'express'
import { ensuredAuthenticated } from '../../middlewares/ensuredAuthenticated'
import { is } from '../../middlewares/permissions'

const router = Router()
const createRoleController = new CreateRoleController()
const createRolePermissionController = new CreateRolePermissionController()

router.post(
  '/',
  ensuredAuthenticated(),
  is(['admin']),
  createRoleController.handle as RequestHandler
)

router.post('/:roleId', createRolePermissionController.handle as RequestHandler)

export { router as rolesRouter }
