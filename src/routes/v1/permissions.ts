import { CreatePermissionController } from '../../controllers/permission/CreatePermissionController'
import { RequestHandler, Router } from 'express'
import { ensuredAuthenticated } from '../../middlewares/ensuredAuthenticated'

const router = Router()
const createPermissionController = new CreatePermissionController()

router.post(
  '/',
  ensuredAuthenticated(),
  createPermissionController.handle as RequestHandler
)

export { router as permissionsRouter }
