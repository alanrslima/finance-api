import { Role } from '../../../entities/Role'
import { PermissionRepository } from '../../../repositories/permission/PermissionRepository'
import { RoleRepository } from '../../../repositories/role/RoleRepository'

interface RolePermissionRequest {
  roleId: string
  permissions: string[]
}

export class CreateRolePermissionService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository
  ) {}

  async execute({
    roleId,
    permissions
  }: RolePermissionRequest): Promise<Role | Error> {
    const role = await this.roleRepository.read({ where: { id: roleId } })

    if (role === null) {
      return new Error('Role does not exists!')
    }

    // const permissionsExists = await this.permissionRepository.listByIds(
    //   permissions
    // );

    // role.permissions = permissionsExists;

    await this.roleRepository.create(role)
    return role
  }
}
