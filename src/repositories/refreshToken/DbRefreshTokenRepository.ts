import { RefreshTokenRepository } from './RefreshTokenRepository'
import { DbBaseRepository } from '../base/DbBaseRepository'
import { refreshTokenSchema } from './RefreshTokenSchema'
import { RefreshToken } from '../../entities/RefreshToken'
import { DeleteResult } from 'typeorm'

export class DbRefreshTokenRepository
  extends DbBaseRepository<RefreshToken>
  implements RefreshTokenRepository
{
  constructor() {
    super({
      entity: RefreshToken,
      schema: refreshTokenSchema
    })
  }

  async deleteByUserId(userId: string | number): Promise<DeleteResult> {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where('userId = :userId', { userId })
      .execute()
  }

  async readWithUser(refreshTokenId: string): Promise<RefreshToken | null> {
    return await this.repository.findOne({
      where: { id: refreshTokenId },
      relations: ['user']
    })
  }

  async listByUserId(userId: string): Promise<RefreshToken[]> {
    return await this.repository.find({ where: { user: { id: userId } } })
  }
}
