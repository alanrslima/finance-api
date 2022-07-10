import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories";

export class GetAllProductsService {
  async execute(): Promise<Product[]> {
    const productRepo = ProductRepository();
    const products = await productRepo.find();
    return products;
  }
}
