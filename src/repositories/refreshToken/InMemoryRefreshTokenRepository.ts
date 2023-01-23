import { InMemoryBaseRepository } from '../base/InMemoryBaseRepository'
import { RefreshTokenRepository } from './RefreshTokenRepository'
import { RefreshToken } from '../../entities/RefreshToken'
import { refreshTokenSchema } from './RefreshTokenSchema'
import { DeleteResult } from 'typeorm'

export class InMemoryRefreshTokenRepository
  extends InMemoryBaseRepository<RefreshToken>
  implements RefreshTokenRepository {
  constructor() {
    super({ schema: refreshTokenSchema })
  }

  async removeByUserId(userId: string): Promise<DeleteResult> {
    return await new Promise((resolve) => {
      this.items = this.items.filter((item) => item.user?.id !== userId)
      const result: DeleteResult = { raw: '', affected: 1 }
      resolve(result)
    })
  }

  async readWithUser(refreshTokenId: string): Promise<RefreshToken> {
    return await new Promise((resolve) => {
      resolve(this.items.find((item) => item.id === refreshTokenId))
    })
  }

  async listByUserId(userId: string): Promise<RefreshToken[]> {
    return await new Promise((resolve) => {
      resolve(this.items.filter((item) => item?.user?.id === userId))
    })
  }
}
