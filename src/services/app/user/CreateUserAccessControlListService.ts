import { User } from "../../../entities/User";
import { RoleRepository } from "../../../repositories/role/RoleRepository";
import { UserRepository } from "../../../repositories/user/UserRepository";

type UserACLRequest = {
  userId: string;
  roles: string[];
};

export class CreateUserAccessControlListService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository
  ) {}

  async execute({ userId, roles }: UserACLRequest): Promise<User | Error> {
    const user = await this.userRepository.read({ where: { id: userId } });

    if (!user) {
      throw new Error("User does not exists!");
    }

    const rolesExists = await this.roleRepository.listByIds(roles);

    user.roles = rolesExists;
    this.userRepository.create(user);
    return user;
  }
}
