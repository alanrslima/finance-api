import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { DbAccountRepository } from '../../repositories/account/DbAccountRepository'
import { DbUserRepository } from '../../repositories/user/DbUserRepository'
import { CreateUserAccountService } from '../../services/app/account/CreateUserAccountService'

export class CreateUserAccountController {
  async handle(request: Request, response: Response): Promise<void> {
    const { userId } = request

    const accountRepository = new DbAccountRepository()
    const userRepository = new DbUserRepository()

    const createUserAccountService = new CreateUserAccountService(
      accountRepository,
      userRepository
    )
    const account = await createUserAccountService.execute({
      account: request.body,
      userId
    })
    response.responser(StatusCodes.CREATED, 'Account created success', account)
  }
}
