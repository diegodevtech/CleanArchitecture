import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.dto";

export default class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}