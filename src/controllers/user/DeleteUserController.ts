import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { DbUserRepository } from '../../repositories/user/DbUserRepository'
import { DeleteUserService } from '../../services/app/user/DeleteUserService'

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { userId } = request
    if (userId !== request.params.id) {
      response.responser(StatusCodes.UNAUTHORIZED, 'Unathorized')
      return
    }
    const userRepository = new DbUserRepository()
    const deleteUserService = new DeleteUserService(userRepository)
    await deleteUserService.execute(request.params.id)
    response.responser(StatusCodes.CREATED, 'User deleted')
  }
}
