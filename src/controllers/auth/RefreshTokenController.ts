import { Request, Response } from "express";
import { RefreshTokenService } from "../../services/app/auth/RefreshTokenService";
import Joi from "joi";
import { Validator } from "../../lib/Validator";

const schema = Joi.object({
  refresh_token: Joi.string().required(),
});

export class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const validator = new Validator(schema);
    await validator.validateAsyncFields(request.body);
    const createRefreshTokenService = new RefreshTokenService();
    const result = await createRefreshTokenService.execute(request.body);
    return response.responser(200, "Token refreshed", result);
  }
}
