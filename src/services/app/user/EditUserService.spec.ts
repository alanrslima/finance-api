import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { Errors } from "../../../lib/Errors";
import { InMemoryUserRepository } from "../../../repositories/user/InMemoryUserRepository";
import { StatusCode } from "../../../types/StatusCode";
import { CreateUserService } from "./CreateUserService";
import { EditUserService } from "./EditUserService";

describe("Edit user service", () => {
  it("Should throw an error if user dont exists", async () => {
    const userRepository = new InMemoryUserRepository();
    const editUserService = new EditUserService(userRepository);
    const userId = "1234";
    const user = new User();
    user.email = "johndoe@email.com";
    user.firstName = "John Doe";
    try {
      await editUserService.execute(userId, user);
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
  it("Should edit user if user exists", async () => {
    const userRepository = new InMemoryUserRepository();
    const editUserService = new EditUserService(userRepository);
    const createUserService = new CreateUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.firstName = "John";
    user.lastName = "Doe";
    user.password = "12345678";
    const createdUser = await createUserService.execute(user);
    const editUser = new User();
    editUser.firstName = "Mary";
    editUser.lastName = "James";
    const response = await editUserService.execute(createdUser.id, editUser);
    expect(response).toHaveProperty("firstName", "Mary");
    expect(response).toHaveProperty("lastName", "James");
  });

  it("Should return an error if dont send required attributes", async () => {
    const userRepository = new InMemoryUserRepository();
    const editUserService = new EditUserService(userRepository);
    const createUserService = new CreateUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.firstName = "John Doe";
    user.password = "12345678";
    const createdUser = await createUserService.execute(user);
    const editUser = new User();
    editUser.firstName = "Test";
    editUser.id = "123";
    try {
      await editUserService.execute(createdUser.id, editUser);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorGenerator);
    }
  });

  it("Should not update email and password attributes", async () => {
    const userRepository = new InMemoryUserRepository();
    const editUserService = new EditUserService(userRepository);
    const createUserService = new CreateUserService(userRepository);
    const user = new User();
    user.email = "johndoe@email.com";
    user.firstName = "John Doe";
    user.password = "12345678";
    const createdUser = await createUserService.execute(user);
    const editUser = new User();
    editUser.firstName = "Test";
    editUser.id = "123";
    editUser.password = "newpassword";
    editUser.email = "newemail@email.com";
    const response = await editUserService.execute(createdUser.id, editUser);

    expect(response).toHaveProperty("email", createdUser.email);
    expect(response).not.toHaveProperty("password", editUser.password);
  });
});
