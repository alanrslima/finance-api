import { CreateUserAccessControlListController } from "../../controllers/user/CreateUserAccessControlListController";
import { CreateUserController } from "../../controllers/user/CreateUserController";
import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";
import { GetUserController } from "../../controllers/user/GetUserController";
import { EditUserController } from "../../controllers/user/EditUserController";

const router = Router();
const createUserController = new CreateUserController();
const editUserController = new EditUserController();
const getUserController = new GetUserController();
const createUserAccessControlListController =
  new CreateUserAccessControlListController();

router.post("/", createUserController.handle);

router.post(
  "/acl",
  ensuredAuthenticated(),
  createUserAccessControlListController.handle
);

router.get("/me", ensuredAuthenticated(), getUserController.handle);

router.put("/:id", ensuredAuthenticated(), editUserController.handle);

export { router as usersRouter };
