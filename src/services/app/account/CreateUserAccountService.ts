import { StatusCodes } from 'http-status-codes'
import { DeepPartial } from 'typeorm'
import { Account } from '../../../entities/Account'
import { BaseEntity } from '../../../entities/BaseEntity'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { AccountRepository } from '../../../repositories/account/AccountRepository'
import { UserRepository } from '../../../repositories/user/UserRepository'

export class CreateUserAccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({
    account,
    userId
  }: {
    userId: string
    account: Account
  }): Promise<DeepPartial<Account & BaseEntity>> {
    const user = await this.userRepository.readById(userId)

    if (user == null) {
      throw new ErrorGenerator(
        'Usuário não cadastrado',
        StatusCodes.BAD_REQUEST
      )
    }

    const accountData = await this.accountRepository.create({
      ...account,
      user
    })

    return accountData
  }
}
