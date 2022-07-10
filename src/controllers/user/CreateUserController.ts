import { NextFunction, Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const createUserService = new CreateUserService();
      const result = await createUserService.execute(request.body);
      return response.responser(201, "User created", result);
    } catch (error) {
      next(error);
    }
  }
}
