import { Role } from "../../../entities/Role";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { RoleRepository } from "../../../repositories/role";
import { StatusCode } from "../../../types/statusCode";

type RoleRequest = {
  name: string;
  description: string;
};

export class CreateRoleService {
  async execute({ name, description }: RoleRequest): Promise<Role | Error> {
    const roleRepo = new RoleRepository();

    if (await roleRepo.read({ name })) {
      return new ErrorGenerator("Role already exists", StatusCode.BadRequest);
    }
    const role = await roleRepo.create({ name, description });
    return role;
  }
}
