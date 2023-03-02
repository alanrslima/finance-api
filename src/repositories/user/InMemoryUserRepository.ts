import { User } from '../../entities/User'
import { InMemoryBaseRepository } from '../base/InMemoryBaseRepository'
import { UserRepository } from './UserRepository'
import { userSchema } from './UserSchema'

export class InMemoryUserRepository
  extends InMemoryBaseRepository<User>
  implements UserRepository
{
  constructor() {
    super({ schema: userSchema })
  }

  async readByEmail(email: string): Promise<User | null> {
    return await new Promise((resolve) => {
      const item = this.items.find((user) => user.email === email) ?? null
      resolve(item)
    })
  }

  async readByEmailWithPassword(email: string): Promise<User | null> {
    return await new Promise((resolve) => {
      const item = this.items.find((user) => user.email === email) ?? null
      resolve(item)
    })
  }
}
