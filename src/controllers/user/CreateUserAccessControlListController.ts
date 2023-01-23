import { Request, Response } from 'express'
import { Validator } from '../../lib/Validator'
import { CreateUserAccessControlListService } from '../../services/app/user/CreateUserAccessControlListService'
import Joi from 'joi'
import { DbUserRepository } from '../../repositories/user/DbUserRepository'
import { DbRoleRepository } from '../../repositories/role/DbRoleRepository'
import { StatusCodes } from 'http-status-codes'

const schema = Joi.object({
  roles: Joi.array().items(Joi.string()).required()
})

export class CreateUserAccessControlListController {
  async handle(request: Request, response: Response): Promise<void> {
    const validator = new Validator(schema)
    await validator.validateAsyncFields(request.body)

    const userRepository = new DbUserRepository()
    const roleRepository = new DbRoleRepository()
    const createUserACLService = new CreateUserAccessControlListService(
      userRepository,
      roleRepository
    )
    const result = await createUserACLService.execute({
      userId: request.userId,
      ...request.body
    })
    response.responser(StatusCodes.CREATED, "User ACL's created", result)
  }
}
