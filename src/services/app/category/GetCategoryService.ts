import { Category } from "../../../entities/Category";
import { CategoryRepository } from "../../../repositories/category/CategoryRepository";
import { ServiceResponser } from "../../../types/ServiceResponser";

export class GetCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    userId,
  }: {
    userId: string;
  }): Promise<ServiceResponser<Category[]>> {
    const data = await this.categoryRepository.list({
      where: { user: { id: userId } },
    });
    return data;
  }
}
