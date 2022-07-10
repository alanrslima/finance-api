import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createUserService = new CreateUserService();
    const result = await createUserService.execute({ username, password });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
