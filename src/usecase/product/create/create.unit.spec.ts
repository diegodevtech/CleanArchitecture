import CreateProductUseCase from "./create";

const input = {
  type: "a",
  name: "Product A",
  price: 20
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
  };
}

describe("Create product use case unit tests", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });

  });

})