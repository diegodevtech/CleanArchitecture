import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../db/sequelize/product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product Repository Test", () => {
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
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("123", "Product 1", 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: "123" } })

    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      price: 100
    })
  })

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("123", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 1 edited")
    product.changePrice(101)

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: "123" } });

    expect(productModel2.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1 edited",
      price: 101,
    });
  })

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("123", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });

    const foundProduct = await productRepository.find("123");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  })

  it("should find all products", async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product("1", "Product 1", 100);
    await productRepository.create(product1);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();

    expect([product1, product2]).toEqual(foundProducts);
  })
});
