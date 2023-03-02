import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { DbUserRepository } from '../../repositories/user/DbUserRepository'
import { GetUserService } from '../../services/app/user/GetUserService'

export class GetUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { userId } = request
    const userRepository = new DbUserRepository()
    const getUserService = new GetUserService(userRepository)
    const result = await getUserService.execute(userId)
    response.responser(StatusCodes.OK, 'User listed', result)
  }
}
