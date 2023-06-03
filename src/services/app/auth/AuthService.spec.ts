import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { InMemoryRefreshTokenRepository } from "../../../repositories/refreshToken/InMemoryRefreshTokenRepository";
import { InMemoryUserRepository } from "../../../repositories/user/InMemoryUserRepository";
import { StatusCode } from "../../../types/StatusCode";
import { CreateUserService } from "../user/CreateUserService";
import { DeleteUserService } from "../user/DeleteUserService";
import { AuthService } from "./AuthService";

describe("Auth service", () => {
  beforeAll(() => {
    // Mock process env
    process.env.SECRET_JWT = "b2fc25582af9861459837b12ed2a6742";
    process.env.JWT_EXPIRES_IN = "24h";
    process.env.JWT_REFRESH_TOKEN_SECONDS = "200000";
  });

  it("Should throw an error if user dont exists", async () => {
    const userRepository = new InMemoryUserRepository();
    const refreshTokenRepository = new InMemoryRefreshTokenRepository();
    const authService = new AuthService(userRepository, refreshTokenRepository);

    const user = new User();
    user.email = "nonexistent@email.com";
    user.password = "12345678";
    try {
      await authService.execute(user);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator);
      expect(error).toHaveProperty("message", "Usuário ou senha inválidos!");
      expect(error).toHaveProperty("statusCode", StatusCode.Unauthorized);
    }
  });

  it("Should throw an error if user was deleted", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";

    const createdUser = await createUserService.execute(user);

    const deleteUserService = new DeleteUserService(userRepository);
    await deleteUserService.execute(createdUser.id);

    const refreshTokenRepository = new InMemoryRefreshTokenRepository();
    const authService = new AuthService(userRepository, refreshTokenRepository);

    try {
      await authService.execute(createdUser);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator);
      expect(error).toHaveProperty("message", "Usuário desativado");
      expect(error).toHaveProperty("statusCode", StatusCode.Unauthorized);
    }
  });

  it("Should throw an error if password does not match", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";

    const createdUser = await createUserService.execute(user);

    const refreshTokenRepository = new InMemoryRefreshTokenRepository();
    const authService = new AuthService(userRepository, refreshTokenRepository);

    createdUser.password = "wrong_password";
    try {
      await authService.execute(createdUser);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator);
      expect(error).toHaveProperty("message", "Usuário ou senha inválidos!");
      expect(error).toHaveProperty("statusCode", StatusCode.Unauthorized);
    }
  });

  it("Should return token and refresh token if user exists and password matches", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";

    await createUserService.execute(user);

    const refreshTokenRepository = new InMemoryRefreshTokenRepository();
    const authService = new AuthService(userRepository, refreshTokenRepository);

    const response = await authService.execute(user);
    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("refreshToken");
  });

  it("Should keep just one refresh token peer user after auth", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";

    const createdUser = await createUserService.execute(user);

    const refreshTokenRepository = new InMemoryRefreshTokenRepository();
    const authService = new AuthService(userRepository, refreshTokenRepository);

    const { refreshToken } = await authService.execute(user);
    const userRefreshTokens = await refreshTokenRepository.listByUserId(
      createdUser.id
    );

    expect(userRefreshTokens).toHaveLength(1);
    expect(userRefreshTokens).toEqual(expect.arrayContaining([refreshToken]));
  });
});
