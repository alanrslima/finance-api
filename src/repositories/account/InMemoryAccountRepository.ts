import { Account } from '../../entities/Account'
import { InMemoryBaseRepository } from '../base/InMemoryBaseRepository'
import { AccountRepository } from './AccountRepository'
import { accountSchema } from './AccountSchema'

export class InMemoryAccountRepository
  extends InMemoryBaseRepository<Account>
  implements AccountRepository {
  constructor() {
    super({ schema: accountSchema })
  }

  async listByUserId(userId: string): Promise<Account[]> {
    return await new Promise((resolve) => {
      const accounts = this.items.filter((item) => item.user?.id === userId)
      resolve(accounts)
    })
  }
}
