import { CreateUserAccessControlListController } from "../../controllers/user/CreateUserAccessControlListController";
import { CreateUserController } from "../../controllers/user/CreateUserController";
import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";

const router = Router();
const createUserController = new CreateUserController();
const createUserAccessControlListController =
  new CreateUserAccessControlListController();

router.post("/users", createUserController.handle);

router.post(
  "/users/acl",
  ensuredAuthenticated(),
  createUserAccessControlListController.handle
);

export { router as usersRouter };
