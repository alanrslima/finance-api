import { CreateUserAccessControlListController } from "../../controllers/user/CreateUserAccessControlListController";
import { CreateUserController } from "../../controllers/user/CreateUserController";
import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";

const router = Router();

router.post("/users", new CreateUserController().handle);

router.post(
  "/users/acl",
  ensuredAuthenticated(),
  new CreateUserAccessControlListController().handle
);

export { router as usersRouter };
