import ProductFactory from "../../../domain/product/factory/product.factory";

const productA = ProductFactory.create("a", "Product A", 20);
const productB = ProductFactory.create("b", "Product A", 20);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("List products use case unit tests", () => {
  it("should list all products", async () => {
    const productRepository = MockRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const output = await listProductUseCase.execute({});

    expect(output.products.lenght).toBe(2);

    expect(output.products[0].id).toBe(productA.id);
    expect(output.products[0].name).toBe(productA.name);
    expect(output.products[0].price).toBe(productA.price);

    expect(output.products[1].id).toBe(productB.id);
    expect(output.products[1].name).toBe(productB.name);
    expect(output.products[1].price).toBe(productB.price);
  })
})