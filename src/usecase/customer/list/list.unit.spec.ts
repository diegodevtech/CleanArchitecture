import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

const customer1 = CustomerFactory.createWithAddress("Customer 1", new Address(
  "Rua",
  1,
  "Zip",
  "City"
));

const customer2 = CustomerFactory.createWithAddress("Customer 2", new Address(
  "Rua",
  1,
  "Zip",
  "City"
));

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("List Customers use case unit tests", () => {
  it("should list customers", async () => {
    const customerRepository = MockRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

    // não mandamos parametro de entrada para execute, como num getAll()
    const output = listCustomerUseCase.execute()

    expect(output.customers.length).toBe(2);

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].street).toBe(customer1.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].street).toBe(customer2.street);
  })
})