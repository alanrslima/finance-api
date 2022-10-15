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
      schema: refreshTokenSchema,
    });
  }
  async removeByUserId(userId: string | number) {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where("userId = :userId", { userId })
      .execute();
  }

  async readWithUser(refreshTokenId: string): Promise<RefreshToken> {
    return await this.repository.findOne({
      where: { id: refreshTokenId },
      relations: ["user"],
    });
  }

  async listByUserId(userId: string | number) {
    return await this.repository.find({ where: { user: { id: userId } } });
  }
}
