import { SelectQueryBuilder } from 'typeorm'
import { RefreshToken } from '../../entities/RefreshToken'
import { BaseRepository } from '../base/BaseRepository'

export interface RefreshTokenRepository extends BaseRepository<RefreshToken> {
  removeByUserId: (userId: string) => Promise<SelectQueryBuilder<RefreshToken>>

  readWithUser: (refreshTokenId: string) => Promise<RefreshToken>

  listByUserId: (userId: string) => Promise<RefreshToken[]>
}
