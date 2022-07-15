import { Request, Response } from "express";
import Joi from "joi";
import { Validator } from "../../lib/Validator";
import { CreateUserAccountService } from "../../services/app/account/CreateUserAccountService";
import { StatusCode } from "../../types/statusCode";

const schema = Joi.object({
  name: Joi.string().required(),
  openingBalance: Joi.number(),
  color: Joi.string(),
});

export class CreateUserAccountController {
  async handle(request: Request, response: Response) {
    const validator = new Validator(schema);
    await validator.validateAsyncFields(request.body);

    const { userId } = request;
    const createUserAccountService = new CreateUserAccountService();
    const product = await createUserAccountService.execute({
      account: request.body,
      userId,
    });
    return response.responser(
      StatusCode.Created,
      "Account created success",
      product
    );
  }
}
