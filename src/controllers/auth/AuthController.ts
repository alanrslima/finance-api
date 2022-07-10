import { Request, Response } from "express";
import { AuthService } from "../../services/auth/AuthService";

export class AuthController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authService = new AuthService();
    const result = await authService.execute({ username, password });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }
}
