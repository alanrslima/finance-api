import { Request, Response } from "express";
import { Validator } from "../../lib/Validator";
import { CreateUserAccessControlListService } from "../../services/app/user/CreateUserAccessControlListService";
import Joi from "joi";
import { StatusCode } from "../../types/statusCode";
import { DbUserRepository } from "../../repositories/user/DbUserRepository";
import { DbRoleRepository } from "../../repositories/role/DbRoleRepository";

const schema = Joi.object({
  roles: Joi.array().items(Joi.string()).required(),
});

export class CreateUserAccessControlListController {
  async handle(request: Request, response: Response) {
    const validator = new Validator(schema);
    await validator.validateAsyncFields(request.body);

    const userRepository = new DbUserRepository();
    const roleRepository = new DbRoleRepository();
    const createUserACLService = new CreateUserAccessControlListService(
      userRepository,
      roleRepository
    );
    const result = await createUserACLService.execute({
      userId: request.userId,
      ...request.body,
    });
    return response.responser(StatusCode.Created, "User ACL's created", result);
  }
}
