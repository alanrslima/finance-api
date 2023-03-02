import { GenerateTokenProvider } from '../../../provider/GenerateTokenProvider'
import dayjs = require('dayjs')
import { GenerateRefreshTokenProvider } from '../../../provider/GenerateRefreshTokenProvider'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { RefreshTokenRepository } from '../../../repositories/refreshToken/RefreshTokenRepository'
import { StatusCodes } from 'http-status-codes'
import { User } from '../../../entities/User'
import { RefreshToken } from '../../../entities/RefreshToken'

interface RefreshTokenRequest {
  refreshTokenId: string
}

class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute({ refreshTokenId }: RefreshTokenRequest): Promise<{
    token: string
    refreshToken?: RefreshToken
  }> {
    const refreshToken = await this.refreshTokenRepository.readWithUser(
      refreshTokenId
    )
    if (refreshToken === null) {
      throw new ErrorGenerator('Refresh token invalid', StatusCodes.NOT_FOUND)
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute({
      userId: refreshToken?.user?.id as string
    })

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    )
    if (refreshTokenExpired) {
      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider(
        this.refreshTokenRepository
      )
      const newRefreshToken = await generateRefreshTokenProvider.execute({
        user: refreshToken?.user as User
      })
      return { token, refreshToken: newRefreshToken }
    }

    return { token }
  }
}

export { RefreshTokenService }
