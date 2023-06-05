import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { Errors } from "../../../lib/Errors";
import { InMemoryUserRepository } from "../../../repositories/user/InMemoryUserRepository";
import { StatusCode } from "../../../types/StatusCode";
import { CreateUserService } from "./CreateUserService";

describe("Create user service", () => {
  it("Should throw an error if exists the same user email", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);

    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";
    user.firstName = "John";
    user.lastName = "Doe";

    await createUserService.execute(user);

    const user2 = new User();
    user2.email = "johndoe@email.com";
    user2.password = "12345678";
    user2.firstName = "John";
    user2.lastName = "Doe";

    try {
      await createUserService.execute(user2);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator);
      expect(error?.detail).toBeInstanceOf(Array);
      expect(error?.detail).toHaveLength(1);
      const [detail] = error.detail;
      expect(detail).toHaveProperty("message", Errors["user.exists"].message);
      expect(detail).toHaveProperty("code", Errors["user.exists"].code);
      expect(error).toHaveProperty("statusCode", StatusCode.BadRequest);
    }
  });

  it("Should create a new user", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);

    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";
    user.firstName = "John";
    user.lastName = "Doe";

    const createdUser = await createUserService.execute(user);
    expect(createdUser).toHaveProperty("email", "johndoe@email.com");
    expect(createdUser).toHaveProperty("firstName", "John");
  });

  it("Should create a new user with encrypted password", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);

    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";
    user.firstName = "John";
    user.lastName = "Doe";

    const createdUser = await createUserService.execute(user);
    expect(createdUser).toHaveProperty("email", "johndoe@email.com");
    expect(createdUser).toHaveProperty("firstName", "John");
    expect(createdUser).not.toHaveProperty("password", user.password);
  });

  it("Should create an new user with encrypted password", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);

    const user = new User();
    user.email = "johndoe@email.com";
    user.password = "12345678";
    user.firstName = "John";
    user.lastName = "Doe";

    const createdUser = await createUserService.execute(user);
    expect(createdUser).toHaveProperty("email", "johndoe@email.com");
    expect(createdUser).toHaveProperty("firstName", "John");
    expect(createdUser).not.toHaveProperty("password", user.password);
  });

  it("Should validate user data on create new user", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);

    const user = new User();

    try {
      await createUserService.execute(user);
    } catch (error) {
      expect(error).toHaveProperty("statusCode", StatusCode.BadRequest);
      expect(error?.detail).toBeInstanceOf(Array);
      const [detail] = error?.detail;
      expect(detail).toHaveProperty(
        "message",
        'O campo "email" não pode ser vazio.'
      );
    }
  });
});
