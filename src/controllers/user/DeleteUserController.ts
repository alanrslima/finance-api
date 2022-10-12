import { Request, Response } from "express";
import { DbUserRepository } from "../../repositories/user/DbUserRepository";
import { DeleteUserService } from "../../services/app/user/DeleteUserService";
import { StatusCode } from "../../types/statusCode";

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    if (userId !== request.params.id) {
      return response.responser(StatusCode.Unauthorized, "Unathorized");
    }
    const userRepository = new DbUserRepository();
    const deleteUserService = new DeleteUserService(userRepository);
    await deleteUserService.execute(request.params.id);
    return response.responser(StatusCode.Created, "User deleted");
  }
}
