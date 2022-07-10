import { AuthController } from "../../controllers/auth/AuthController";
import { RefreshTokenController } from "../../controllers/auth/RefreshTokenController";
import { Router } from "express";

const router = Router();

const authController = new AuthController();
const refreshTokenController = new RefreshTokenController();

router.post("/auth/login", authController.handle);
router.post("/auth/refresh-token", refreshTokenController.handle);

export { router as authRouter };
