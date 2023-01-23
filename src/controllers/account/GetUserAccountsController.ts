import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { DbAccountRepository } from '../../repositories/account/DbAccountRepository'
import { GetUserAccountsService } from '../../services/app/account/GetUserAccountsService'

export class GetUserAccountsController {
  async handle(request: Request, response: Response): Promise<void> {
    const { userId } = request
    const userRepository = new DbAccountRepository()
    const getUserAccountsService = new GetUserAccountsService(userRepository)
    const accounts = await getUserAccountsService.execute({ userId })
    response.responser(StatusCodes.OK, 'Accounts listed success', accounts)
  }
}
