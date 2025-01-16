import ProductFactory from "../../../domain/product/factory/product.factory";

const product = ProductFactory.create("a", "Product A", 20);

const input = {
  id: product.id,
  name: "Product A edited",
  price: 29,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Update product use case unit tests", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input);

    expect(output).toStrictEqual(input);
  });
})