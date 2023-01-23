import { Request, Response } from 'express'

export class GetHealthController {
  async handle(request: Request, response: Response) {
    // const { name, description } = request.body;

    // const createPermissionService = new CreatePermissionService();

    // const result = await createPermissionService.execute({ name, description });

    // if (result instanceof Error) {
    //   return response.status(400).json(result.message);
    // }

    return response.json({})
  }
}
