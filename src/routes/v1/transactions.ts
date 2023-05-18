import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";
import { GetTransactionController } from "../../controllers/transaction/GetTransactionController";
import { CreateTransactionController } from "../../controllers/transaction/CreateTransactionController";

const router = Router();

const getTransactionController = new GetTransactionController();
const createTransactionController = new CreateTransactionController();

router.get("/", ensuredAuthenticated(), getTransactionController.handle);
router.post("/", ensuredAuthenticated(), createTransactionController.handle);

export { router as transactionsRouter };
