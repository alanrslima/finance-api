import { Request, Response } from "express";
import Joi from "joi";
import { Validator } from "../../lib/Validator";
import { CreateRoleService } from "../../services/app/role/CreateRoleService";
import { StatusCode } from "../../types/statusCode";

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export class CreateRoleController {
  async handle(request: Request, response: Response) {
    const validator = new Validator(schema);
    await validator.validateAsyncFields(request.body);

    const createRoleService = new CreateRoleService();
    const result = await createRoleService.execute(request.body);
    return response.responser(StatusCode.Created, "Role created", result);
  }
}
