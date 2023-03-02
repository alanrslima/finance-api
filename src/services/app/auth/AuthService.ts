import { compare } from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { RefreshToken } from '../../../entities/RefreshToken'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { GenerateRefreshTokenProvider } from '../../../provider/GenerateRefreshTokenProvider'
import { GenerateTokenProvider } from '../../../provider/GenerateTokenProvider'
import { RefreshTokenRepository } from '../../../repositories/refreshToken/RefreshTokenRepository'
import { UserRepository } from '../../../repositories/user/UserRepository'

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<{
    token: string
    refreshToken: RefreshToken
  }> {
    const userExisted = await this.userRepository.readByEmailWithPassword(email)

    if (userExisted == null) {
      throw new ErrorGenerator(
        'Usuário ou senha inválidos!',
        StatusCodes.UNAUTHORIZED
      )
    }

    const passwordMatch = await compare(password, userExisted?.password ?? '')
    if (!passwordMatch) {
      throw new ErrorGenerator(
        'Usuário ou senha inválidos!',
        StatusCodes.UNAUTHORIZED
      )
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute({
      userId: userExisted?.id ?? ''
    })

    await this.refreshTokenRepository.deleteByUserId(userExisted.id)

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider(
      this.refreshTokenRepository
    )
    const refreshToken = await generateRefreshTokenProvider.execute({
      user: userExisted
    })

    return {
      token,
      refreshToken
    }
  }
}
