import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/db/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find";
import Product from "../../../domain/product/entity/product";

describe("Find product use case integration test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const product = new Product("123", "Product A", 20);
    await productRepository.create(product);

    const input = {
      id: "123"
    };

    const output = {
      id: "123",
      name: "Product A",
      price: 20,
    };

    const result = await findProductUseCase.execute(input);

    expect(result).toEqual(output);

  })
})