import dayjs from 'dayjs'
import { StatusCodes } from 'http-status-codes'
import { RefreshToken } from '../../../entities/RefreshToken'
import { User } from '../../../entities/User'
import { ErrorGenerator } from '../../../lib/ErrorGenerator'
import { InMemoryRefreshTokenRepository } from '../../../repositories/refreshToken/InMemoryRefreshTokenRepository'
import { InMemoryUserRepository } from '../../../repositories/user/InMemoryUserRepository'
import { CreateUserService } from '../user/CreateUserService'
import { AuthService } from './AuthService'
import { RefreshTokenService } from './RefreshTokenService'

describe('Refresh token service', () => {
  // it('Should throw an error if refresh token dont exists', async () => {
  //   const refreshTokenRepository = new InMemoryRefreshTokenRepository()
  //   const refreshTokenService = new RefreshTokenService(refreshTokenRepository)

  //   try {
  //     await refreshTokenService.execute({ refreshTokenId: '1234' })
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(ErrorGenerator)
  //     expect(error).toHaveProperty('message', 'Refresh token invalid')
  //     expect(error).toHaveProperty('statusCode', StatusCodes.NOT_FOUND)
  //   }
  // })

  // it('Should return token and a new refresh token if refresh token was expired', async () => {
  //   const userRepository = new InMemoryUserRepository()
  //   const createUserService = new CreateUserService(userRepository)
  //   const user = new User()
  //   user.email = 'johndoe@email.com'
  //   user.password = '12345678'

  //   const createdUser = await createUserService.execute(user)
  //   const refreshTokenRepository = new InMemoryRefreshTokenRepository()

  //   const refreshToken = new RefreshToken()
  //   refreshToken.expiresIn = dayjs().subtract(1, 'hour').unix()
  //   refreshToken.user = createdUser

  //   const createdRefreshToken = await refreshTokenRepository.create(
  //     refreshToken
  //   )

  //   // Mock process env
  //   process.env.SECRET_JWT = 'b2fc25582af9861459837b12ed2a6742'
  //   process.env.JWT_EXPIRES_IN = '24h'
  //   process.env.JWT_REFRESH_TOKEN_SECONDS = '200000'

  //   const refreshTokenService = new RefreshTokenService(refreshTokenRepository)
  //   const response = await refreshTokenService.execute({
  //     refreshTokenId: createdRefreshToken.id
  //   })

  //   expect(response).toHaveProperty('token')
  //   expect(response).toHaveProperty('refreshToken')
  //   expect(response?.refreshToken?.id).not.toEqual(createdRefreshToken?.id)
  // })

  it('Should return only token if refresh token was not expired', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(userRepository)
    const user = new User()
    user.email = 'johndoe@email.com'
    user.password = '12345678'

    await createUserService.execute(user)

    await createUserService.execute({
      email: 'email2',
      password: '123',
      id: 'oi'
    })
    const refreshTokenRepository = new InMemoryRefreshTokenRepository()

    // Mock process env
    process.env.SECRET_JWT = 'b2fc25582af9861459837b12ed2a6742'
    process.env.JWT_EXPIRES_IN = '24h'
    process.env.JWT_REFRESH_TOKEN_SECONDS = '200000'

    const authService = new AuthService(userRepository, refreshTokenRepository)
    const { refreshToken } = await authService.execute({
      email: user.email,
      password: user.password
    })

    const refreshTokenService = new RefreshTokenService(refreshTokenRepository)
    const response = await refreshTokenService.execute({
      refreshTokenId: refreshToken.id
    })

    expect(response).toHaveProperty('token')
    expect(response).not.toHaveProperty('refreshToken')
  })
})
