import Product from "./product";

describe("Product unit test", () => {
  it("should throw error when ID is not given", () => {
    expect(() => {
      const prod1 = new Product("", "Prod 1", 10);
      prod1.validate();
    }).toThrow("ID is required");
  });

  it("should throw error when ID is not given", () => {
    expect(() => {
      const prod1 = new Product("123", "", 0);
      prod1.validate();
    }).toThrow("Name is required");
  });

  it("should throw error when price is lower or equal to zero", () => {
    // const prod1 = new Product("123", "Prod 1", 0);
    expect(() => {
      const prod1 = new Product("123", "123", 0);
      prod1.validate();
    }).toThrow("Price must be greater than zero.");

    expect(() => {
      const prod1 = new Product("123", "123", -110);
      prod1.validate();
    }).toThrow("Price must be greater than zero.");
  });

  it("it should change name", () => {
    const prod1 = new Product("123", "123", 110);
    prod1.changeName("Produto 1");
    const newName = prod1.name;
    expect(newName).toBe("Produto 1");
  });

  it("it should change price", () => {
    const prod1 = new Product("123", "123", 110);
    prod1.changePrice(120);
    const newPrice = prod1.price;
    expect(newPrice).toBe(120);
  });
});
