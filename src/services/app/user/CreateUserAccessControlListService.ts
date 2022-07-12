import { User } from "../../../entities/User";
import {
  PermissionRepository,
  RoleRepository,
  UserRepository,
} from "../../../repositories";

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
    const userRepo = UserRepository();

    const user = await userRepo.findOne(userId);

    if (!user) {
      throw new Error("User does not exists!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );

    const rolesExists = await RoleRepository().findByIds(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    userRepo.save(user);

    return user;
  }
}
