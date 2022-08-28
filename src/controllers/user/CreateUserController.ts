import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Validator } from "../../lib/Validator";
import { CreateUserService } from "../../services/app/user/CreateUserService";
import { StatusCode } from "../../types/statusCode";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export class CreateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const validator = new Validator(schema);
    await validator.validateAsyncFields(request.body);

    const createUserService = new CreateUserService();
    const result = await createUserService.execute(request.body);
    return response.responser(StatusCode.Created, "User created", result);
  }
}
