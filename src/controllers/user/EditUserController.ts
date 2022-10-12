import { NextFunction, Request, Response } from "express";
import { Validator } from "../../lib/Validator";
import { userSchema } from "../../repositories/user/index.validations";
import { EditUserService } from "../../services/app/user/EditUserService";
import { StatusCode } from "../../types/statusCode";

export class EditUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const validator = new Validator(userSchema);
    await validator.validateAsyncFields(request.body);

    const { userId } = request;
    if (userId !== request.params.id) {
      return response.responser(StatusCode.Unauthorized, "Unathorized");
    }

    const editUserService = new EditUserService();
    const result = await editUserService.execute(
      request.params.id,
      request.body
    );
    return response.responser(StatusCode.Created, "User edited", result);
  }
}
