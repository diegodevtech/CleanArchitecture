import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/db/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("List products use case integration test", () => {
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

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const listProductsUseCase = new ListProductUseCase(productRepository);

    const productA = ProductFactory.create("a", "Product A", 20);
    const productB = ProductFactory.create("b", "Product B", 20);

    await productRepository.create(productA as Product);
    await productRepository.create(productB as Product);

    const output = await listProductsUseCase.execute({});

    expect(output.products.length).toBe(2);

    expect(output.products[0].id).toBe(productA.id);
    expect(output.products[0].name).toBe(productA.name);
    expect(output.products[0].price).toBe(productA.price);
    expect(output.products[0].price).toBe(20);

    expect(output.products[1].id).toBe(productB.id);
    expect(output.products[1].name).toBe(productB.name);
    expect(output.products[1].price).toBe(productB.price);
    expect(output.products[1].price).toBe(40);
  })
})