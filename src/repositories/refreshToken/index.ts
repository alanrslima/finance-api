import { RefreshToken } from "../../entities/RefreshToken";
import { BaseRepository } from "../base";
import { refreshTokenSchema } from "./index.validations";

export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor() {
    super({
      repository: RefreshToken,
      filterable: ["id"],
      schema: refreshTokenSchema,
    });
  }
}
