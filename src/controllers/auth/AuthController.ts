import { Request, Response } from 'express'
// import { AuthService } from '../../services/app/auth/AuthService'
import Joi from 'joi'
import { Validator } from '../../lib/Validator'
// import { DbUserRepository } from '../../repositories/user/DbUserRepository'
// import { DbRefreshTokenRepository } from '../../repositories/refreshToken/DbRefreshTokenRepository'
// import { StatusCodes } from 'http-status-codes'

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export class AuthController {
  async handle(request: Request, response: Response): Promise<void> {
    const validator = new Validator(schema)
    await validator.validateAsyncFields(request.body)

    // const userRepository = new DbUserRepository()
    // const refreshTokenRepository = new DbRefreshTokenRepository()
    // const authService = new AuthService(userRepository, refreshTokenRepository)
    // const logged = await authService.execute(request.body)
    // response.responser(StatusCodes.OK, 'User logged success', logged)
  }
}
