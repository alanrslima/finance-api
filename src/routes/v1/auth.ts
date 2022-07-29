import { AuthController } from "../../controllers/auth/AuthController";
import { RefreshTokenController } from "../../controllers/auth/RefreshTokenController";
import { Router } from "express";
import { passportGithub } from "../../strategys/github";
import { CallbackController } from "../../controllers/auth/CallbackController";

const router = Router();

const authController = new AuthController();
const refreshTokenController = new RefreshTokenController();
const callbackController = new CallbackController();

router.post("/auth/login", authController.handle);
router.post("/auth/refresh-token", refreshTokenController.handle);

// Github OAUTH
router.get("/auth/github/login", passportGithub.authenticate("oauth2"));
router.get(
  "/auth/github/callback",
  passportGithub.authenticate("oauth2", { failureRedirect: "/login" }),
  callbackController.handle
);

export { router as authRouter };
