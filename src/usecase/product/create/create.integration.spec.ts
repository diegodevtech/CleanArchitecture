import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import CreateProductUseCase from "./create";
import ProductModel from "../../../infrastructure/product/db/sequelize/product.model";

describe("Create product use case integration tests", () => {

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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const productA = ProductFactory.create("a", "Product A", 20);
    const productB = ProductFactory.create("b", "Product B", 20);

    await productRepository.create(productA as Product);
    await productRepository.create(productB as Product);

    const inputA = {
      type: "a",
      name: "Product A",
      price: 20,
    };

    const inputB = {
      type: "b",
      name: "Product B",
      price: 20,
    };

    const outputA = {
      id: expect.any(String),
      name: "Product A",
      price: 20,
    };

    const outputB = {
      id: expect.any(String),
      name: "Product B",
      price: 40,
    };

    const resultA = await createProductUseCase.execute(inputA);
    const resultB = await createProductUseCase.execute(inputB);

    expect(resultA).toEqual(outputA);
    expect(resultB).toEqual(outputB);
  })
})