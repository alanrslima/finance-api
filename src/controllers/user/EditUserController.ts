import { Request, Response } from "express";
import { DbUserRepository } from "../../repositories/user/DbUserRepository";
import { EditUserService } from "../../services/app/user/EditUserService";
import { StatusCode } from "../../types/StatusCode";

export class EditUserController {
  async handle(request: Request, response: Response) {
    const userRepository = new DbUserRepository();
    const editUserService = new EditUserService(userRepository);
    const result = await editUserService.execute(request.userId, request.body);
    return response.responser(StatusCode.Created, "User edited", result);
  }
}
