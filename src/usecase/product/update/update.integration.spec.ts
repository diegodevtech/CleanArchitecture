import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/db/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update";

describe("Update Product use case integration test", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const product = ProductFactory.create("a", "Product A", 20);

    await productRepository.create(product as Product);

    const input = {
      id: product.id,
      name: "Product A edited",
      price: 29,
    };

    const output = {
      id: product.id,
      name: "Product A edited",
      price: 29,
    };

    const result = await updateProductUseCase.execute(input);

    expect(result).toEqual(output);

  });
})