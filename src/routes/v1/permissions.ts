import { CreatePermissionController } from "../../controllers/permission/CreatePermissionController";
import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";

const router = Router();

router.post(
  "/",
  ensuredAuthenticated(),
  new CreatePermissionController().handle
);

export { router as permissionsRouter };
