import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";
// import { GetUserAccountsController } from "../../controllers/account/GetUserAccountsController";
import { CreateUserAccountController } from "../../controllers/account/CreateUserAccountController";
import { CreateTransactionController } from "../../controllers/transaction/CreateTransactionController";

const router = Router();

// const getUserAccountsController = new GetUserAccountsController();
const createTransactionController = new CreateTransactionController();

// router.get("/", ensuredAuthenticated(), getUserAccountsController.handle);
router.post("/", ensuredAuthenticated(), createTransactionController.handle);

export { router as transactionsRouter };
