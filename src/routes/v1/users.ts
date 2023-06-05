import { CreateUserAccessControlListController } from "../../controllers/user/CreateUserAccessControlListController";
import { CreateUserController } from "../../controllers/user/CreateUserController";
import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";
import { GetUserController } from "../../controllers/user/GetUserController";
import { EditUserController } from "../../controllers/user/EditUserController";
import { DeleteUserController } from "../../controllers/user/DeleteUserController";

const router = Router();
const createUserController = new CreateUserController();
const editUserController = new EditUserController();
const getUserController = new GetUserController();
const deleteUserController = new DeleteUserController();
const createUserAccessControlListController =
  new CreateUserAccessControlListController();

router.post("/", createUserController.handle);

router.post(
  "/acl",
  ensuredAuthenticated(),
  createUserAccessControlListController.handle
);

router.get("/me", ensuredAuthenticated(), getUserController.handle);

router.put("/", ensuredAuthenticated(), editUserController.handle);

router.delete("/", ensuredAuthenticated(), deleteUserController.handle);

export { router as usersRouter };
