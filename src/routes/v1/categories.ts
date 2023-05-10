import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";
import { CreateCategoryController } from "../../controllers/category/CreateCategoryController";
import { GetCategoryController } from "../../controllers/category/GetCategoryController";

const router = Router();

const createCategoryController = new CreateCategoryController();
const getCategoryController = new GetCategoryController();

router.get("/", ensuredAuthenticated(), getCategoryController.handle);
router.post("/", ensuredAuthenticated(), createCategoryController.handle);

export { router as categoriesRouter };
