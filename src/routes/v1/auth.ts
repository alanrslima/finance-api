import { SessionController } from "../../controllers/auth/SessionController";
import { Router } from "express";

const router = Router();

router.post("/login", new SessionController().handle);

export { router as authRouter };
