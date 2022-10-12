import { RefreshTokenRepository } from "./RefreshTokenRepository";
import { DbBaseRepository } from "../base/DbBaseRepository";
import { refreshTokenSchema } from "./RefreshTokenSchema";
import { RefreshToken } from "../../entities/RefreshToken";

export class DbRefreshTokenRepository
  extends DbBaseRepository<RefreshToken>
  implements RefreshTokenRepository
{
  constructor() {
    super({
      entity: RefreshToken,
      filterable: ["id"],
      schema: refreshTokenSchema,
    });
  }
}
