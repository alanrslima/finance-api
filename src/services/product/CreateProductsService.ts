import { ProductRepository } from "../../repositories";

type ProductRequest = {
  name: string;
  description: string;
  price: number;
};

export class CreateProductsService {
  async execute({ name, description, price }: ProductRequest) {
    const productRepo = ProductRepository();
    const product = productRepo.create({
      name,
      description,
      price,
    });

    await productRepo.save(product);

    return productRepo;
  }
}
