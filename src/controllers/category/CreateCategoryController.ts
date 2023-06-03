import { Request, Response } from "express";
import { DbCategoryRepository } from "../../repositories/category/DbCategoryRepository";
import { StatusCode } from "../../types/StatusCode";
import { CreateCategoryService } from "../../services/app/category/CreateCategoryService";

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const categoryRepository = new DbCategoryRepository();
    const service = new CreateCategoryService(categoryRepository);
    const product = await service.execute(userId, request.body);
    return response.responser(
      StatusCode.Created,
      "Category created success",
      product
    );
  }
}
