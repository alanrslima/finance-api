import { NextFunction, Request, Response } from "express";
import { DbUserRepository } from "../../repositories/user/DbUserRepository";
import { GetUserService } from "../../services/app/user/GetUserService";
import { StatusCode } from "../../types/StatusCode";

export class GetUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { userId } = request;
    const userRepository = new DbUserRepository();
    const getUserService = new GetUserService(userRepository);
    const result = await getUserService.execute({ id: userId });
    return response.responser(StatusCode.Success, "User listed", result);
  }
}
