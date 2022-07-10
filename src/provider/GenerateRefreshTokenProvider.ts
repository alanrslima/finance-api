// import { client } from "../prisma/client"
import dayjs from "dayjs";
import { User } from "../entities/User";
import { RefreshTokenRepository } from "../repositories";

type GenerateRefreshTokenProviderProps = {
  user: User;
};

class GenerateRefreshTokenProvider {
  async execute({ user }: GenerateRefreshTokenProviderProps) {
    const expiresIn = dayjs()
      .add(Number(process.env.JWT_REFRESH_TOKEN_SECONDS), "seconds")
      .unix();

    const repo = RefreshTokenRepository();
    const refreshToken = await repo.create({
      user,
      expiresIn,
    });

    await repo.save(refreshToken);
    return refreshToken;
  }
}

export { GenerateRefreshTokenProvider };
