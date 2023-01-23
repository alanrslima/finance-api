import { DeepPartial } from 'typeorm'
import { BaseEntity } from '../../../entities/BaseEntity'
import { Permission } from '../../../entities/Permission'
import { PermissionRepository } from '../../../repositories/permission/PermissionRepository'

interface PermissionRequest {
  name: string
  description: string
}

export class CreatePermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute({
    name,
    description
  }: PermissionRequest): Promise<DeepPartial<Permission & BaseEntity>> {
    // if (await this.permissionRepository.read({ where: { name } })) {
    //   return new ErrorGenerator(
    //     "Permission already exists",
    //     StatusCode.BadRequest
    //   );
    // }

    const permission = await this.permissionRepository.create({
      name,
      description
    })
    return permission
  }
}
