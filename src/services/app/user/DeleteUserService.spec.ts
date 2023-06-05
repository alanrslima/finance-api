import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { Errors } from "../../../lib/Errors";
import { InMemoryUserRepository } from "../../../repositories/user/InMemoryUserRepository";
import { StatusCode } from "../../../types/StatusCode";
import { DeleteUserService } from "./DeleteUserService";

describe("Delete user service", () => {
  it("Should throw an error if user does not exists", async () => {
    const userRepository = new InMemoryUserRepository();
    const deleteUserService = new DeleteUserService(userRepository);
    const userId = "1234";
    try {
      await deleteUserService.execute(userId);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator);
      expect(error?.detail).toBeInstanceOf(Array);
      expect(error?.detail).toHaveLength(1);
      const [detail] = error.detail;
      expect(detail).toHaveProperty("message", Errors["user.invalid"].message);
      expect(detail).toHaveProperty("code", Errors["user.invalid"].code);
      expect(error).toHaveProperty("statusCode", StatusCode.BadRequest);
    }
  });
  it("Should make logic delete on delete user", async () => {
    const userRepository = new InMemoryUserRepository();
    const deleteUserService = new DeleteUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.firstName = "John Doe";
    user.password = "12345678";
    const createdUser = await userRepository.create(user);
    await deleteUserService.execute(createdUser.id);
    const userDeleted = await userRepository.read(createdUser.id);
    expect(userDeleted).toHaveProperty("deletedAt");
    expect(userDeleted.deletedAt).toBeInstanceOf(Date);
  });
});
