import { Request, Response } from "express";
import { RefreshTokenService } from "../../services/auth/RefreshTokenService";

export class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const createRefreshTokenService = new RefreshTokenService();
    const token = await createRefreshTokenService.execute({ refresh_token });
    return res.json(token);
  }
}
