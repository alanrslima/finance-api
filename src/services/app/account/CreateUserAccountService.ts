import { DeepPartial } from 'typeorm'
import { Account } from '../../../entities/Account'
import { BaseEntity } from '../../../entities/BaseEntity'
import { AccountRepository } from '../../../repositories/account/AccountRepository'

export class CreateUserAccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    account,
    userId
  }: {
    userId: string
    account: Account
  }): Promise<DeepPartial<Account & BaseEntity>> {
    const accountData = await this.accountRepository.create({
      ...account,
      user: { id: userId }
    })

    return accountData
  }
}
