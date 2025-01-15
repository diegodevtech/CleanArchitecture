import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

const customer = CustomerFactory.createWithAddress("Diego", new Address(
  "Rua", 1, "Zip", "City"
));

const input = {
  id: customer.id,
  name: "Diego",
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
  })
})