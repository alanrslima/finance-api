import { Permission } from "../../../entities/Permission";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { PermissionRepository } from "../../../repositories/permission/PermissionRepository";
import { StatusCode } from "../../../types/statusCode";

type PermissionRequest = {
  name: string;
  description: string;
};

export class CreatePermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  async execute({
    name,
    description,
  }: PermissionRequest): Promise<Permission | Error> {
    // if (await this.permissionRepository.read({ where: { name } })) {
    //   return new ErrorGenerator(
    //     "Permission already exists",
    //     StatusCode.BadRequest
    //   );
    // }

    const permission = await this.permissionRepository.create({
      name,
      description,
    });
    return permission;
  }
}
