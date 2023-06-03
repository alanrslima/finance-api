import { Request, Response } from "express";
import { DbUserRepository } from "../../repositories/user/DbUserRepository";
import { CreateUserService } from "../../services/app/user/CreateUserService";
import { StatusCode } from "../../types/StatusCode";
export class CreateUserController {
  async handle(request: Request, response: Response) {
    const userRepository = new DbUserRepository();
    const createUserService = new CreateUserService(userRepository);
    const result = await createUserService.execute(request.body);
    return response.responser(StatusCode.Created, "User created", result);
  }
}
