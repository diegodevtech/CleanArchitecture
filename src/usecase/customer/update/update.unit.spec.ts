import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update";

const customer = CustomerFactory.createWithAddress("Diego", new Address(
  "Rua", 1, "Zip", "City"
));

const input = {
  id: customer.id,
  name: "Diego Updated",
  address: {
    street: "Rua updated",
    number: 2,
    zip: "Zip updated",
    city: "City udpated",
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Update customer use case unit tests", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await updateCustomerUseCase.execute(input);

    expect(output).toStrictEqual(input);
  });

  it("should throw error when name is missing", async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    input.name = "";
    await expect(updateCustomerUseCase.execute(input)).rejects.toThrow("Name is required")
  });

  it("should throw error when zip is missing", async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    input.name = "Diego Updated";
    input.address.zip = "";

    await expect(updateCustomerUseCase.execute(input)).rejects.toThrow("Zip Code is required.")
  })
});