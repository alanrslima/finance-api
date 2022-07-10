import { CreatePermissionController } from "../../controllers/permission/CreatePermissionController";
import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";

const permissionsRouter = Router();

permissionsRouter.post(
  "/permissions",
  ensuredAuthenticated(),
  new CreatePermissionController().handle
);

export { permissionsRouter };
