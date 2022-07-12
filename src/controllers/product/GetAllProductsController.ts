import { Request, Response } from "express";
import { GetAllProductsService } from "../../services/app/product/GetAllProductsService";
import { StatusCode } from "../../types/statusCode";

export class GetAllProductsController {
  async handle(request: Request, response: Response) {
    const getAllProductsService = new GetAllProductsService();
    const products = await getAllProductsService.execute();
    return response.responser(
      StatusCode.Success,
      "Products listed success",
      products
    );
  }
}
