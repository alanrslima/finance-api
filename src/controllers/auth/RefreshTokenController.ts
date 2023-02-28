import { Request, Response } from 'express'
// import { RefreshTokenService } from '../../services/app/auth/RefreshTokenService'
// import Joi from "joi";
// import { Validator } from "../../lib/Validator";
// import { DbRefreshTokenRepository } from '../../repositories/refreshToken/DbRefreshTokenRepository'
// import { StatusCodes } from 'http-status-codes'

// const schema = Joi.object({
//   refresh_token: Joi.string().required(),
// });

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<void> {
    // const validator = new Validator(schema);
    // await validator.validateAsyncFields(request.body);
    // const refreshTokenRepository = new DbRefreshTokenRepository()
    // const createRefreshTokenService = new RefreshTokenService(
    //   refreshTokenRepository
    // )
    // const result = await createRefreshTokenService.execute(request.body)
    // response.responser(StatusCodes.OK, 'Token refreshed', result)
  }
}
