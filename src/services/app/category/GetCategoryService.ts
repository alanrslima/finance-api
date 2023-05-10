import { Category } from "../../../entities/Category";
import { CategoryRepository } from "../../../repositories/category/CategoryRepository";

export class GetCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ userId }: { userId: string }): Promise<Category[]> {
    const [categories] = await this.categoryRepository.list({
      where: { user: { id: userId } },
    });
    return categories;
  }
}
