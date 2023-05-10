import { FindManyOptions, FindConditions } from "typeorm";
import { Category } from "../../entities/Category";
import { InMemoryBaseRepository } from "../base/InMemoryBaseRepository";
import { CategoryRepository } from "./CategoryRepository";
import { categorySchema } from "./CategorySchema";

export class InMemoryCategoryRepository
  extends InMemoryBaseRepository<Category>
  implements CategoryRepository
{
  constructor() {
    super({ schema: categorySchema });
  }
  list(options?: FindManyOptions<Category>): Promise<[Category[], number]>;
  list(conditions?: FindConditions<Category>): Promise<[Category[], number]>;
  list(conditions?: unknown): Promise<[Category[], number]> {
    throw new Error("Method not implemented.");
  }
}
