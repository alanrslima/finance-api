import { Request, Response } from "express";
import { Validator } from "../../lib/Validator";
import { CreateUserAccessControlListService } from "../../services/app/user/CreateUserAccessControlListService";
import Joi from "joi";
import { StatusCode } from "../../types/statusCode";

const schema = Joi.object({
  permissions: Joi.array().items(Joi.string()).required(),
  roles: Joi.array().items(Joi.string()).required(),
});

export class CreateUserAccessControlListController {
  async handle(request: Request, response: Response) {
    const validator = new Validator(schema);
    await validator.validateAsyncFields(request.body);

    const createUserACLService = new CreateUserAccessControlListService();
    const result = await createUserACLService.execute({
      userId: request.userId,
      ...request.body,
    });
    return response.responser(StatusCode.Created, "User ACL's created", result);
  }
}
