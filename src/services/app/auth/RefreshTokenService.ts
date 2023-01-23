import { GenerateTokenProvider } from '../../../provider/GenerateTokenProvider'
import dayjs = require('dayjs')
import { GenerateRefreshTokenProvider } from '../../../provider/GenerateRefreshTokenProvider'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { RefreshTokenRepository } from '../../../repositories/refreshToken/RefreshTokenRepository'
import { StatusCodes } from 'http-status-codes'
import { InMemoryRefreshTokenRepository } from '../../../repositories/refreshToken/InMemoryRefreshTokenRepository'

interface RefreshTokenRequest {
  refresh_token: string
}

class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository:
      | RefreshTokenRepository
      | InMemoryRefreshTokenRepository
  ) {}

  async execute({
    refresh_token
  }: RefreshTokenRequest): Promise<{ token: string }> {
    const refreshToken = await this.refreshTokenRepository.readWithUser(
      refresh_token
    )
    if (refreshToken === null) {
      throw new ErrorGenerator('Refresh token invalid', StatusCodes.NOT_FOUND)
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute({
      userId: refreshToken.user.id
    })

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    )
    if (refreshTokenExpired) {
      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider(
        this.refreshTokenRepository
      )
      const newRefreshToken = await generateRefreshTokenProvider.execute({
        user: refreshToken.user
      })
      return { token, refreshToken: newRefreshToken }
    }

    return { token }
  }
}

export { RefreshTokenService }
