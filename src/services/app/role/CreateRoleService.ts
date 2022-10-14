import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { RoleRepository } from "../../../repositories/role/RoleRepository";
import { StatusCode } from "../../../types/statusCode";

type RoleRequest = {
  name: string;
  description: string;
};

export class CreateRoleService {
  constructor(private roleRepository: RoleRepository) {}

  async execute({ name, description }: RoleRequest) {
    // if (await this.roleRepository.read({ where: { name } })) {
    //   return new ErrorGenerator("Role already exists", StatusCode.BadRequest);
    // }
    const role = await this.roleRepository.create({ name, description });
    return role;
  }
}
