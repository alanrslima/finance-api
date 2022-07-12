import { compare } from "bcryptjs";
import { RefreshToken } from "../../../entities/RefreshToken";
import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { GenerateRefreshTokenProvider } from "../../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider";
import { RefreshTokenRepository, UserRepository } from "../../../repositories";
import { StatusCode } from "../../../types/statusCode";

export class AuthService {
  async execute(user: User) {
    const userRepo = UserRepository();
    const userExisted = await userRepo.findOne({ username: user.username });

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

    // Delete refresh user tokens
    const refreshTokenRepo = RefreshTokenRepository();
    await refreshTokenRepo
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where("userId = :id", { id: userExisted.id })
      .execute();

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshTokenProvider.execute({
      user: userExisted,
    });

    return { token, refreshToken };
  }
}
