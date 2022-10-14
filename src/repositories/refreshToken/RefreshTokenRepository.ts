import { DeleteResult } from "typeorm";
import { RefreshToken } from "../../entities/RefreshToken";
import { BaseRepository } from "../base/BaseRepository";

export interface RefreshTokenRepository extends BaseRepository<RefreshToken> {
  removeByUserId(userId: string): Promise<DeleteResult>;

  readWithUser(refreshTokenId: string): Promise<RefreshToken>;
}
