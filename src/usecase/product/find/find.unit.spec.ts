import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Product A", 20);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Find product use case unit tests", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123"
    };

    const output = {
      id: "123",
      name: "Product A",
      price: 20
    };

    const result = await findProductUseCase(input);

    expect(result).toEqual(output);
  })
})