import { InMemoryBaseRepository } from "../base/InMemoryBaseRepository";
import { RefreshTokenRepository } from "./RefreshTokenRepository";
import { RefreshToken } from "../../entities/RefreshToken";
import { refreshTokenSchema } from "./RefreshTokenSchema";

export class InMemoryAccountRepository
  extends InMemoryBaseRepository<RefreshToken>
  implements RefreshTokenRepository
{
  constructor() {
    super({ schema: refreshTokenSchema });
  }
}
