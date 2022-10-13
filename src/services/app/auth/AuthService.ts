import { compare } from "bcryptjs";
import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { GenerateRefreshTokenProvider } from "../../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider";
import { RefreshTokenRepository } from "../../../repositories/refreshToken/RefreshTokenRepository";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { StatusCode } from "../../../types/statusCode";
import { GetUserService } from "../user/GetUserService";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute(user: User) {
    const getUserService = new GetUserService(this.userRepository);
    const userExisted = await getUserService.execute({ email: user.email });

    if (!userExisted) {
      throw new ErrorGenerator(
        "Usuário ou senha inválidos!",
        StatusCode.Unauthorized
      );
    }

    const passwordMatch = await compare(user.password, userExisted.password);
    if (!passwordMatch) {
      throw new ErrorGenerator(
        "Usuário ou senha inválidos!",
        StatusCode.Unauthorized
      );
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute({
      userId: userExisted.id,
    });

    await this.refreshTokenRepository.delete("userId = :id", {
      id: userExisted.id,
    });

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider(
      this.refreshTokenRepository
    );
    const refreshToken = await generateRefreshTokenProvider.execute({
      user: userExisted,
    });

    return { token, refreshToken };
  }
}
