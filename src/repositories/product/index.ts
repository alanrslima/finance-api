import { Product } from "../../entities/Product";
import { BaseRepository } from "../base";
import { permissionSchema } from "./index.validations";

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super({
      entity: Product,
      filterable: ["id"],
      schema: permissionSchema,
    });
  }
}
