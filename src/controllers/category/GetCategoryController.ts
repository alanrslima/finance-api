import { Request, Response } from "express";
import { StatusCode } from "../../types/statusCode";
import { DbCategoryRepository } from "../../repositories/category/DbCategoryRepository";
import { GetCategoryService } from "../../services/app/category/GetCategoryService";

export class GetCategoryController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const categoryRepository = new DbCategoryRepository();
    const service = new GetCategoryService(categoryRepository);
    const categories = await service.execute({ userId });
    return response.responser(
      StatusCode.Success,
      "Categories listed success",
      categories
    );
  }
}
