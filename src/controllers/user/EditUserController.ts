import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
// import { Validator } from "../../lib/Validator";
import { DbUserRepository } from '../../repositories/user/DbUserRepository'
// import { userSchema } from "../../repositories/user/index.validations";
import { EditUserService } from '../../services/app/user/EditUserService'

export class EditUserController {
  async handle(request: Request, response: Response): Promise<void> {
    const { userId } = request
    if (userId !== request.params.id) {
      response.responser(StatusCodes.UNAUTHORIZED, 'Unathorized')
      return
    }

    const userRepository = new DbUserRepository()
    const editUserService = new EditUserService(userRepository)
    const result = await editUserService.execute(
      request.params.id,
      request.body
    )
    response.responser(StatusCodes.CREATED, 'User edited', result)
  }
}
