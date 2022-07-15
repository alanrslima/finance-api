import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";
import { GetUserAccountsController } from "../../controllers/account/GetUserAccountsController";
import { CreateUserAccountController } from "../../controllers/account/CreateUserAccountController";

const router = Router();

const getUserAccountsController = new GetUserAccountsController();
const createUserAccountController = new CreateUserAccountController();

router.get("/", ensuredAuthenticated(), getUserAccountsController.handle);
router.post("/", ensuredAuthenticated(), createUserAccountController.handle);

export { router as accountsRouter };
