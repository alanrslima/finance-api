import { User } from "../../../../entities/User";
import { CreateUserService } from "../../../../services/app/user/CreateUserService";

describe("Create user service", () => {
  const newUser = new User();
  newUser.email = "test@email.com";
  newUser.password = "123456";

  it("Should create a new user", () => {
    const userService = new CreateUserService();
    userService.execute = jest.fn().mockReturnValue(newUser);
    const response = userService.execute(newUser);
    expect(response).toEqual(expect.objectContaining(newUser));
  });
});
