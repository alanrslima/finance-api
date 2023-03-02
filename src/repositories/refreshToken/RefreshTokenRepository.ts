// import { SelectQueryBuilder } from 'typeorm'
import { DeleteResult } from 'typeorm'
import { RefreshToken } from '../../entities/RefreshToken'
import { BaseRepository } from '../base/BaseRepository'

export interface RefreshTokenRepository extends BaseRepository<RefreshToken> {
  deleteByUserId: (userId: string) => Promise<DeleteResult>
  readWithUser: (refreshTokenId: string) => Promise<RefreshToken | null>
  listByUserId: (userId: string) => Promise<RefreshToken[]>
}
