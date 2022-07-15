import { ProductRepository } from "../../../repositories/product";

type ProductRequest = {
  name: string;
  description: string;
  price: number;
};

export class CreateProductsService {
  async execute({ name, description, price }: ProductRequest) {
    const productRepo = new ProductRepository();
    const product = await productRepo.create({
      name,
      description,
      price,
    });

    return product;
  }
}
