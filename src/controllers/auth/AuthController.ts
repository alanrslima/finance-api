import { Request, Response } from "express";
import { AuthService } from "../../services/app/auth/AuthService";
import Joi from "joi";
import { StatusCode } from "../../types/statusCode";
import { Validator } from "../../lib/Validator";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export class AuthController {
  async handle(request: Request, response: Response) {
    const validator = new Validator(schema);
    await validator.validateAsyncFields(request.body);

    const authService = new AuthService();
    const logged = await authService.execute(request.body);
    return response.responser(
      StatusCode.Success,
      "User logged success",
      logged
    );
  }
}
