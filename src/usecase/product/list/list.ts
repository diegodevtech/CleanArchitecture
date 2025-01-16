import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.dto";

class OutputMapper {
  static toOutput(productsArray: Product[]): OutputListProductDTO {
    return {
      products: productsArray.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      }))
    }
  }
}

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}