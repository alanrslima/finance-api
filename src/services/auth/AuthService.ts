import { compare } from "bcryptjs";
import { RefreshToken } from "../../entities/RefreshToken";
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { RefreshTokenRepository, UserRepository } from "../../repositories";

type UserRequest = {
  username: string;
  password: string;
};

export class AuthService {
  async execute({ username, password }: UserRequest) {
    const userRepo = UserRepository();
    const user = await userRepo.findOne({ username });

    if (!user) {
      return new Error("User does not exists!");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return new Error("User or Password incorrect");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute({ userId: user.id });

    // Delete refresh user tokens
    const refreshTokenRepo = RefreshTokenRepository();
    await refreshTokenRepo
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where("userId = :id", { id: user.id })
      .execute();

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshTokenProvider.execute({ user });

    return { token, refreshToken };
  }
}
