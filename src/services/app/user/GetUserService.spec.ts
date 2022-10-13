import { InMemoryUserRepository } from "../../../repositories/user/InMemoryUserRepository";
import { GetUserService } from "./GetUserService";

describe("Get user service", () => {
  it("Should return an user case exists", async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserService = new GetUserService(userRepository);

    const newUser = await userRepository.create({
      lastName: "Jose",
      email: "jose@gmail.com",
      password: "12345678",
    });

    const user = await getUserService.execute({ id: newUser.id });
    expect(user).not.toBeUndefined();
    expect(user).toEqual(expect.objectContaining(newUser));
  });

  it("Should return undefined case dont exist the user", async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserService = new GetUserService(userRepository);

    const user = await getUserService.execute({ id: "12345678" });
    expect(user).toBeUndefined();
  });

  it("Should return undefined case user was deleted", async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserService = new GetUserService(userRepository);

    const newUser = await userRepository.create({
      lastName: "Jose",
      email: "jose@gmail.com",
      password: "12345678",
    });

    await userRepository.update({
      ...newUser,
      deletedAt: new Date(),
    });

    const user = await getUserService.execute({ id: newUser.id });

    expect(user).toBeUndefined();
  });
});