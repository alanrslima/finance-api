import { User } from "../../../entities/User";
import { PermissionRepository } from "../../../repositories/permission";
import { RoleRepository } from "../../../repositories/role";
import { UserRepository } from "../../../repositories/user";

type UserACLRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

export class CreateUserAccessControlListService {
  async execute({
    userId,
    roles,
    permissions,
  }: UserACLRequest): Promise<User | Error> {
    const userRepo = new UserRepository();
    const user = await userRepo.read(userId);

    if (!user) {
      throw new Error("User does not exists!");
    }

    const permissionRepo = new PermissionRepository();
    const permissionsExists = await permissionRepo.listByIds(permissions);

    const roleRepo = new RoleRepository();
    const rolesExists = await roleRepo.listByIds(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    userRepo.create(user);
    return user;
  }
}
