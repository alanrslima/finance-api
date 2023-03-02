import { DeepPartial } from 'typeorm'
import { BaseEntity } from '../../../entities/BaseEntity'
import { Role } from '../../../entities/Role'
import { RoleRepository } from '../../../repositories/role/RoleRepository'

interface RoleRequest {
  name: string
  description: string
}

export class CreateRoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute({
    name,
    description
  }: RoleRequest): Promise<DeepPartial<Role & BaseEntity>> {
    // if (await this.roleRepository.read({ where: { name } })) {
    //   return new ErrorGenerator("Role already exists", StatusCode.BadRequest);
    // }
    const role = new Role()
    role.name = name
    role.description = description
    const newRole = await this.roleRepository.create(role)
    return newRole
  }
}
