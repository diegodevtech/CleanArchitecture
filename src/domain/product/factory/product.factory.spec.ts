import ProductFactory from "./product.factory";

describe("Product Factory Unit Test", () => {
  it("should create an A-typed product", () => {
    const product = ProductFactory.create("a", "Product A", 1)

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A")
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create an B-typed product", () => {
    const product = ProductFactory.create("b", "Product B", 1)

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B")
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("shohuld throw error when receiving product type different than A or B", () => {
    expect(() => ProductFactory.create("c", "Product C", 1)).toThrow("Product type not supported")
  })
})