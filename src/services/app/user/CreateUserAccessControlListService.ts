import { User } from "../../../entities/User";
import { RoleRepository } from "../../../repositories/role";
import { UserRepository } from "../../../repositories/user";

type UserACLRequest = {
  userId: string;
  roles: string[];
};

export class CreateUserAccessControlListService {
  async execute({ userId, roles }: UserACLRequest): Promise<User | Error> {
    const userRepo = new UserRepository();
    const user = await userRepo.read(userId);

    if (!user) {
      throw new Error("User does not exists!");
    }

    const roleRepo = new RoleRepository();
    const rolesExists = await roleRepo.listByIds(roles);

    user.roles = rolesExists;

    userRepo.create(user);
    return user;
  }
}
