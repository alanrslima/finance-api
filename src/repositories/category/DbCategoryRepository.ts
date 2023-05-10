import { CategoryRepository } from "./CategoryRepository";
import { DbBaseRepository } from "../base/DbBaseRepository";
import { categorySchema } from "./CategorySchema";
import { Category } from "../../entities/Category";

export class DbCategoryRepository
  extends DbBaseRepository<Category>
  implements CategoryRepository
{
  constructor() {
    super({ entity: Category, schema: categorySchema });
  }
}
