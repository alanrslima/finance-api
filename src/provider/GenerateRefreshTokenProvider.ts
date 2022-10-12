// import { client } from "../prisma/client"
import dayjs from "dayjs";
import { User } from "../entities/User";
import { RefreshTokenRepository } from "../repositories/refreshToken/RefreshTokenRepository";

type GenerateRefreshTokenProviderProps = {
  user: User;
};

class GenerateRefreshTokenProvider {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute({ user }: GenerateRefreshTokenProviderProps) {
    const expiresIn = dayjs()
      .add(Number(process.env.JWT_REFRESH_TOKEN_SECONDS), "seconds")
      .unix();

    const result = await this.refreshTokenRepository.create({
      expiresIn,
      user,
    });
    return result;
  }
}

export { GenerateRefreshTokenProvider };
