import { AuthController } from "../../controllers/auth/AuthController";
import { RefreshTokenController } from "../../controllers/auth/RefreshTokenController";
import { Router } from "express";
import { passportGithub } from "../../strategys/github";
import { CallbackController } from "../../controllers/auth/CallbackController";

const router = Router();

const authController = new AuthController();
const refreshTokenController = new RefreshTokenController();
const callbackController = new CallbackController();

router.post("/login", authController.handle);
router.post("/refresh-token", refreshTokenController.handle);

// Github OAUTH
// router.get("/github/login", passportGithub.authenticate("oauth2"));
// router.get(
//   "/github/callback",
//   passportGithub.authenticate("oauth2", { failureRedirect: "/login" }),
//   callbackController.handle
// );

// facebook OAUTH
// router.get("/github/login", passportGithub.authenticate("oauth2"));
// router.get(
//   "/github/callback",
//   passportGithub.authenticate("oauth2", { failureRedirect: "/login" }),
//   callbackController.handle
// );

export { router as authRouter };
