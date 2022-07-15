import { Product } from "../../../entities/Product";
import { ProductRepository } from "../../../repositories/product";

export class GetAllProductsService {
  async execute(): Promise<Product[]> {
    const productRepo = new ProductRepository();
    const products = await productRepo.list();
    return products;
  }
}
