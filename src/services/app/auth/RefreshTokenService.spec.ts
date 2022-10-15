import dayjs from "dayjs";
import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { InMemoryRefreshTokenRepository } from "../../../repositories/refreshToken/InMemoryRefreshTokenRepository";
import { InMemoryUserRepository } from "../../../repositories/user/InMemoryUserRepository";
import { StatusCode } from "../../../types/statusCode";
import { CreateUserService } from "../user/CreateUserService";
import { DeleteUserService } from "../user/DeleteUserService";
import { AuthService } from "./AuthService";
import { RefreshTokenService } from "./RefreshTokenService";

describe("Refresh token service", () => {
  it("Should throw an error if refresh token dont exists", async () => {
    const refreshTokenRepository = new InMemoryRefreshTokenRepository();
    const refreshTokenService = new RefreshTokenService(refreshTokenRepository);

    try {
      await refreshTokenService.execute({ refresh_token: "1234" });
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator);
      expect(error).toHaveProperty("message", "Refresh token invalid");
      expect(error).toHaveProperty("statusCode", StatusCode.NotFound);
    }
  });

  it("Should return token and a new refresh token if refresh token was expired", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";

    const createdUser = await createUserService.execute(user);
    const refreshTokenRepository = new InMemoryRefreshTokenRepository();

    const createdRefreshToken = await refreshTokenRepository.create({
      expiresIn: dayjs().subtract(1, "hour").unix(),
      user: createdUser,
    });

    // Mock process env
    process.env.SECRET_JWT = "b2fc25582af9861459837b12ed2a6742";
    process.env.JWT_EXPIRES_IN = "24h";
    process.env.JWT_REFRESH_TOKEN_SECONDS = "200000";

    const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
    const response = await refreshTokenService.execute({
      refresh_token: createdRefreshToken.id,
    });

    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("refreshToken");
    expect(response?.refreshToken?.id).not.toEqual(createdRefreshToken?.id);
  });

  it("Should return only token if refresh token was not expired", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";

    await createUserService.execute(user);
    const refreshTokenRepository = new InMemoryRefreshTokenRepository();

    // Mock process env
    process.env.SECRET_JWT = "b2fc25582af9861459837b12ed2a6742";
    process.env.JWT_EXPIRES_IN = "24h";
    process.env.JWT_REFRESH_TOKEN_SECONDS = "200000";

    const authService = new AuthService(userRepository, refreshTokenRepository);
    const { refreshToken } = await authService.execute(user);

    const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
    const response = await refreshTokenService.execute({
      refresh_token: refreshToken.id,
    });

    expect(response).toHaveProperty("token");
    expect(response).not.toHaveProperty("refreshToken");
  });
});
