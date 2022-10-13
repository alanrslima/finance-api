import { NextFunction, Request, Response } from "express";
// import { Validator } from "../../lib/Validator";
import { DbUserRepository } from "../../repositories/user/DbUserRepository";
// import { userSchema } from "../../repositories/user/index.validations";
import { EditUserService } from "../../services/app/user/EditUserService";
import { StatusCode } from "../../types/statusCode";

export class EditUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    if (userId !== request.params.id) {
      return response.responser(StatusCode.Unauthorized, "Unathorized");
    }

    const userRepository = new DbUserRepository();
    const editUserService = new EditUserService(userRepository);
    const result = await editUserService.execute(
      request.params.id,
      request.body
    );
    return response.responser(StatusCode.Created, "User edited", result);
  }
}
