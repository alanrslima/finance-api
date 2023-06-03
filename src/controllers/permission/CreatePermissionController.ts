import { Request, Response } from "express";
// import Joi from "joi";
// import { Validator } from "../../lib/Validator";
import { DbPermissionRepository } from "../../repositories/permission/DbPermissionRepository";
import { CreatePermissionService } from "../../services/app/permission/CreatePermissionService";
import { StatusCode } from "../../types/StatusCode";

// const schema = Joi.object({
//   name: Joi.string().required(),
//   description: Joi.string().required(),
// });
export class CreatePermissionController {
  async handle(request: Request, response: Response) {
    // const validator = new Validator(schema);
    // await validator.validateAsyncFields(request.body);

    const permissionRepository = new DbPermissionRepository();
    const createPermissionService = new CreatePermissionService(
      permissionRepository
    );
    const permission = await createPermissionService.execute(request.body);
    return response.responser(
      StatusCode.Created,
      "Permission created success",
      permission
    );
  }
}
