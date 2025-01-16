import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update";

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

  it("should throw error when name is missing", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    input.name = "";
    await expect(updateProductUseCase.execute(input)).rejects.toThrow("Name is required")
  });

  it("should throw error when name is missing", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    input.name = "Product A edited";
    input.price = -1;
    await expect(updateProductUseCase.execute(input)).rejects.toThrow("Price must be greater than zero.")
  });
});