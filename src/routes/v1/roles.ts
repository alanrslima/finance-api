import { CreateRoleController } from "../../controllers/role/CreateRoleController";
import { CreateRolePermissionController } from "../../controllers/role/CreateRolePermissionController";
import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";
import { is } from "../../middleware/permissions";

const router = Router();

router.post(
  "/roles",
  ensuredAuthenticated(),
  is(["admin"]),
  new CreateRoleController().handle
);

router.post("/roles/:roleId", new CreateRolePermissionController().handle);

export { router as rolesRouter };
