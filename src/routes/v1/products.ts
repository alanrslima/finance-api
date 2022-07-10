import { Router } from "express";
import { ensuredAuthenticated } from "../../middleware/ensuredAuthenticated";
import { is } from "../../middleware/permissions";
import { CreateProductController } from "../../controllers/product/CreateProductController";
import { GetAllProductsController } from "../../controllers/product/GetAllProductsController";

const router = Router();

const createProductController = new CreateProductController();
const getAllProductsController = new GetAllProductsController();

router.post(
  "/products",
  ensuredAuthenticated(),
  //   is(["admin"]),
  createProductController.handle
);

router.get(
  "/products",
  ensuredAuthenticated(),
  //   is(["admin"]),
  getAllProductsController.handle
);

export { router as productsRouter };
