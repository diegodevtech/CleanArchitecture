import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.dto";
import { v4 as uuid } from "uuid";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = ProductFactory.create(input.type, input.name, input.price);

    await this.productRepository.create(product as Product);

    return {
      id: uuid(),
      name: input.name,
      price: input.price,
    }

  }
}