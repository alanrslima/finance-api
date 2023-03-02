import { User } from '../../../entities/User'
import { RoleRepository } from '../../../repositories/role/RoleRepository'
import { UserRepository } from '../../../repositories/user/UserRepository'

interface UserACLRequest {
  userId: string
  roles: string[]
}

export class CreateUserAccessControlListService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository
  ) {}

  async execute({ userId, roles }: UserACLRequest): Promise<User> {
    // const user = await this.userRepository.read({ where: { id: userId } })

    const user = await this.userRepository.read({ where: { id: userId } })

    if (user === null) {
      throw new Error('User does not exists!')
    }

    // const rolesExists = await this.roleRepository.listByIds(roles);

    // user.roles = rolesExists;
    await this.userRepository.create(user)
    return user
  }
}
