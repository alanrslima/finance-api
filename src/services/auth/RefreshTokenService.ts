// import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import dayjs = require("dayjs");
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider";
import { RefreshTokenRepository } from "../../repositories";
import { RefreshToken } from "../../entities/RefreshToken";

type RefreshTokenRequest = {
  refresh_token: string;
};

class RefreshTokenService {
  async execute({ refresh_token }: RefreshTokenRequest) {
    const refreshTokenRepo = RefreshTokenRepository();
    const refreshToken = await refreshTokenRepo.findOne({
      where: { id: refresh_token },
      relations: ["user"],
    });
    if (!refreshToken) {
      throw new Error("Refresh token invalid");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute({
      userId: refreshToken.user.id,
    });

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );
    if (refreshTokenExpired) {
      await refreshTokenRepo
        .createQueryBuilder()
        .delete()
        .from(RefreshToken)
        .where("userId = :id", { id: refreshToken.user.id })
        .execute();

      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
      const newRefreshToken = await generateRefreshTokenProvider.execute({
        user: refreshToken.user,
      });
      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

export { RefreshTokenService };
