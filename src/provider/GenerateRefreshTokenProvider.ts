// import { client } from "../prisma/client"
import dayjs from 'dayjs'
import { DeepPartial } from 'typeorm'
import { BaseEntity } from '../entities/BaseEntity'
import { RefreshToken } from '../entities/RefreshToken'
import { User } from '../entities/User'
import { InMemoryRefreshTokenRepository } from '../repositories/refreshToken/InMemoryRefreshTokenRepository'
import { RefreshTokenRepository } from '../repositories/refreshToken/RefreshTokenRepository'

interface GenerateRefreshTokenProviderProps {
  user: User
}

class GenerateRefreshTokenProvider {
  constructor(
    private readonly refreshTokenRepository:
      | RefreshTokenRepository
      | InMemoryRefreshTokenRepository
  ) {}

  async execute({
    user
  }: GenerateRefreshTokenProviderProps): Promise<
    DeepPartial<RefreshToken & BaseEntity>
  > {
    const expiresIn = dayjs()
      .add(Number(process.env.JWT_REFRESH_TOKEN_SECONDS), 'seconds')
      .unix()

    const result = await this.refreshTokenRepository.create({
      expiresIn,
      user
    })
    delete result.user
    return result
  }
}

export { GenerateRefreshTokenProvider }
