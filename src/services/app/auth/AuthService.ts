import { compare } from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { DeepPartial } from 'typeorm'
import { BaseEntity } from '../../../entities/BaseEntity'
import { RefreshToken } from '../../../entities/RefreshToken'
import { User } from '../../../entities/User'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { GenerateRefreshTokenProvider } from '../../../provider/GenerateRefreshTokenProvider'
import { GenerateTokenProvider } from '../../../provider/GenerateTokenProvider'
import { InMemoryRefreshTokenRepository } from '../../../repositories/refreshToken/InMemoryRefreshTokenRepository'
import { RefreshTokenRepository } from '../../../repositories/refreshToken/RefreshTokenRepository'
import { UserRepository } from '../../../repositories/user/UserRepository'
import { GetUserService } from '../user/GetUserService'

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository:
      | RefreshTokenRepository
      | InMemoryRefreshTokenRepository
  ) {}

  async execute(user: User): Promise<{
    token: string
    refreshToken: DeepPartial<RefreshToken & BaseEntity>
  }> {
    const getUserService = new GetUserService(this.userRepository)
    const userExisted = await getUserService.execute({ email: user.email })

    if (userExisted == null) {
      throw new ErrorGenerator(
        'Usuário ou senha inválidos!',
        StatusCodes.UNAUTHORIZED
      )
    }

    if (userExisted.deletedAt != null) {
      throw new ErrorGenerator('Usuário desativado', StatusCodes.UNAUTHORIZED)
    }

    const passwordMatch = await compare(user.password, userExisted.password)
    if (!passwordMatch) {
      throw new ErrorGenerator(
        'Usuário ou senha inválidos!',
        StatusCodes.UNAUTHORIZED
      )
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute({
      userId: userExisted.id
    })

    await this.refreshTokenRepository.removeByUserId(userExisted.id)
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider(
      this.refreshTokenRepository
    )
    const refreshToken = await generateRefreshTokenProvider.execute({
      user: userExisted
    })

    return { token, refreshToken }
  }
}
