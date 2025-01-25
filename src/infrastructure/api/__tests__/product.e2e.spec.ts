import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "../../../usecase/product/create/create";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { app, sequelize } from "../express";
import request from "supertest";

describe("Product E2E test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product A",
      price: 20,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toEqual("Product A");
    expect(response.body.price).toBe(20);
  });

  it("should list all products", async () => {
    const responseA = await request(app).post("/product").send({
      type: "a",
      name: "Product A",
      price: 20,
    });
    const responseB = await request(app).post("/product").send({
      type: "b",
      name: "Product B",
      price: 40,
    });

    expect(responseA.statusCode).toBe(200);
    expect(responseB.statusCode).toBe(200);

    const response = await request(app).get('/product').send({});

    expect(response.statusCode).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0].price).toBe(20);
    expect(response.body.products[1].price).toBe(80);
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const productA = ProductFactory.create("a", "Product A", 20);

    await productRepository.create(productA as Product);

    const inputA = {
      type: "a",
      name: "Product A",
      price: 20,
    };

    const outputA = {
      id: expect.any(String),
      name: "Product A",
      price: 20,
    };

    const resultA = await createProductUseCase.execute(inputA);

    expect(resultA).toEqual(outputA);

    const response = await request(app).put('/product').send({
      id: productA.id,
      name: 'Product A alterado',
      price: 40
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual('Product A alterado');
    expect(response.body.price).toBe(40);
  });
});
