import { InMemoryBaseRepository } from '../base/InMemoryBaseRepository'
import { RefreshTokenRepository } from './RefreshTokenRepository'
import { RefreshToken } from '../../entities/RefreshToken'
import { DeleteResult } from 'typeorm'
import { refreshTokenSchema } from './RefreshTokenSchema'

export class InMemoryRefreshTokenRepository
  extends InMemoryBaseRepository<RefreshToken>
  implements RefreshTokenRepository
{
  constructor() {
    super({ schema: refreshTokenSchema })
  }

  async deleteByUserId(userId: string): Promise<DeleteResult> {
    return await new Promise((resolve) => {
      this.items = this.items.filter((item) => item.user?.id !== userId)
      const result: DeleteResult = { raw: '', affected: 1 }
      resolve(result)
    })
  }

  async readWithUser(refreshTokenId: string): Promise<RefreshToken | null> {
    return await new Promise((resolve) => {
      let item: RefreshToken | null = null
      for (const element of this.items) {
        if (element.id === refreshTokenId) {
          item = element
          break
        }
      }
      resolve(item)
    })
  }

  async listByUserId(userId: string): Promise<RefreshToken[]> {
    return await new Promise((resolve) => {
      resolve(this.items.filter((item) => item?.user?.id === userId))
    })
  }
}
