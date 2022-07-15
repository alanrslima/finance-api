// import { client } from "../prisma/client"
import dayjs from "dayjs";
import { User } from "../entities/User";
import { RefreshTokenRepository } from "../repositories/refreshToken";

type GenerateRefreshTokenProviderProps = {
  user: User;
};

class GenerateRefreshTokenProvider {
  async execute({ user }: GenerateRefreshTokenProviderProps) {
    const expiresIn = dayjs()
      .add(Number(process.env.JWT_REFRESH_TOKEN_SECONDS), "seconds")
      .unix();

    const repo = new RefreshTokenRepository();
    const result = await repo.create({ expiresIn, user });
    return result;
  }
}

export { GenerateRefreshTokenProvider };
