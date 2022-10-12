import { NextFunction, Request, Response } from "express";
import { Validator } from "../../lib/Validator";
import { userSchema } from "../../repositories/user/index.validations";
import { CreateUserService } from "../../services/app/user/CreateUserService";
import { StatusCode } from "../../types/statusCode";
export class CreateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const validator = new Validator(userSchema);
    await validator.validateAsyncFields(request.body);

    const createUserService = new CreateUserService();
    const result = await createUserService.execute(request.body);
    return response.responser(StatusCode.Created, "User created", result);
  }
}
