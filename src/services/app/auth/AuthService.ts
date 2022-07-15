import { compare } from "bcryptjs";
import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { GenerateRefreshTokenProvider } from "../../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider";
import { RefreshTokenRepository } from "../../../repositories/refreshToken";
import { UserRepository } from "../../../repositories/user";
import { StatusCode } from "../../../types/statusCode";

export class AuthService {
  async execute(user: User) {
    const userRepo = new UserRepository();
    const userExisted = await userRepo.read({ username: user.username });

    if (!userExisted) {
      throw new ErrorGenerator("User dos not exists!", StatusCode.Unauthorized);
    }

    const passwordMatch = await compare(user.password, userExisted.password);
    if (!passwordMatch) {
      throw new ErrorGenerator(
        "User or Password incorrect!",
        StatusCode.Unauthorized
      );
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute({
      userId: userExisted.id,
    });

    const refreshTokenRepo = new RefreshTokenRepository();
    await refreshTokenRepo.delete("userId = :id", { id: userExisted.id });

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshTokenProvider.execute({
      user: userExisted,
    });

    return { token, refreshToken };
  }
}
