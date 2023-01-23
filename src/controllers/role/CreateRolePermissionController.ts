import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
// import Joi from "joi";
import { DbPermissionRepository } from '../../repositories/permission/DbPermissionRepository'
import { DbRoleRepository } from '../../repositories/role/DbRoleRepository'
// import { Validator } from "../../lib/Validator";
import { CreateRolePermissionService } from '../../services/app/role/CreateRolePermissionService'

// const schema = Joi.object({
//   permissions: Joi.array().items(Joi.string()).required(),
// });

export class CreateRolePermissionController {
  async handle(request: Request, response: Response): Promise<void> {
    // const validator = new Validator(schema);
    // await validator.validateAsyncFields(request.body);

    const roleRepository = new DbRoleRepository()
    const permissionRepository = new DbPermissionRepository()
    const createRolePermissionService = new CreateRolePermissionService(
      roleRepository,
      permissionRepository
    )
    const result = await createRolePermissionService.execute({
      roleId: request.params.roleId,
      ...request.body
    })
    response.responser(StatusCodes.CREATED, 'Role permission created', result)
  }
}
