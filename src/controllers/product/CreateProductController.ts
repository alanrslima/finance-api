import { Request, Response } from "express";
import Joi from "joi";
import { Validator } from "../../lib/Validator";
import { CreateProductsService } from "../../services/app/product/CreateProductsService";
import { StatusCode } from "../../types/statusCode";

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});
export class CreateProductController {
  async handle(request: Request, response: Response) {
    const validator = new Validator(schema);
    await validator.validateAsyncFields(request.body);

    const createProductService = new CreateProductsService();
    const product = await createProductService.execute(request.body);
    return response.responser(
      StatusCode.Created,
      "Product created success",
      product
    );
  }
}
