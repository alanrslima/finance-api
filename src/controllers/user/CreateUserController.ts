import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { DbUserRepository } from '../../repositories/user/DbUserRepository'
import { CreateUserService } from '../../services/app/user/CreateUserService'
export class CreateUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const userRepository = new DbUserRepository()
    const createUserService = new CreateUserService(userRepository)
    const result = await createUserService.execute(request.body)
    response.responser(StatusCodes.CREATED, 'User created', result)
  }
}
