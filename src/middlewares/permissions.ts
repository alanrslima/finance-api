import { NextFunction, Request, Response } from 'express'
// import { ErrorGenerator } from '../lib/ErrorGenerator'
// import { UserRepository } from "../repositories/user";

export function can(permissionsRoutes: string[]) {
  return async (request: Request, _: Response, next: NextFunction) => {
    // const { userId } = request
    // const userRepo = new UserRepository();
    // const user = await userRepo.read({
    //   where: { id: userId },
    //   relations: ["permissions"],
    // });

    // if (!user) {
    //   throw new ErrorGenerator("User does not exists", StatusCode.BadRequest);
    // }

    // const permissionExists = user.permissions
    //   .map((permission) => permission.name)
    //   .some((permission) => permissionsRoutes.includes(permission));

    // if (!permissionExists) {
    //   throw new ErrorGenerator(
    //     "User does not have permissions to access the resource",
    //     StatusCode.Unauthorized
    //   );
    // }

    next()
  }
}

export function is(rolesRoutes: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    // const { userId } = request;
    // const userRepo = new UserRepository();
    // const user = await userRepo.read({
    //   where: { id: userId },
    //   relations: ["roles"],
    // });

    // if (!user) {
    //   return response.status(400).json("User does not exists");
    // }

    // const roleExists = user.roles
    //   .map((role) => role.name)
    //   .some((role) => rolesRoutes.includes(role));

    // if (!roleExists) {
    //   return response.status(401).end();
    // }

    next()
  }
}
