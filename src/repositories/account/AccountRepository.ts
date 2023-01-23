import { Account } from '../../entities/Account'
import { BaseRepository } from '../base/BaseRepository'

export interface AccountRepository extends BaseRepository<Account> {
  listByUserId: (userId: string) => Promise<Account[]>
}
