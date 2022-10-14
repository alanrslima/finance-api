import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider";
import dayjs = require("dayjs");
import { GenerateRefreshTokenProvider } from "../../../provider/GenerateRefreshTokenProvider";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { StatusCode } from "../../../types/statusCode";
import { RefreshTokenRepository } from "../../../repositories/refreshToken/RefreshTokenRepository";

type RefreshTokenRequest = {
  refresh_token: string;
};

class RefreshTokenService {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute({ refresh_token }: RefreshTokenRequest) {
    const refreshToken = await this.refreshTokenRepository.readWithUser(
      refresh_token
    );
    if (!refreshToken) {
      throw new ErrorGenerator("Refresh token invalid", StatusCode.NotFound);
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute({
      userId: refreshToken.user.id,
    });

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );
    if (refreshTokenExpired) {
      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider(
        this.refreshTokenRepository
      );
      const newRefreshToken = await generateRefreshTokenProvider.execute({
        user: refreshToken.user,
      });
      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

export { RefreshTokenService };
