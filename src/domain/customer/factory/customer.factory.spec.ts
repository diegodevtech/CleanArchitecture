import Address from "../value-object/address";
import CustomerFactory from "./customer.factory"

describe("Customer Factory Unit tests", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("John")

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Rua tal", 10, "11122-121", "Manaus")
    let customer = CustomerFactory.createWithAddress("John", address)

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address);
  })
})