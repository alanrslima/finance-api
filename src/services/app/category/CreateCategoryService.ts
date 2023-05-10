import { Category } from "../../../entities/Category";
import { CategoryRepository } from "../../../repositories/category/CategoryRepository";

export class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(userId: string, category: Category) {
    const data = await this.categoryRepository.create({
      ...category,
      user: { id: userId },
    });
    return data;
  }
}
