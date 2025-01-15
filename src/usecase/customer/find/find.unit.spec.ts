import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find";

const customer = new Customer("123", "Customer 1");
const address = new Address("Rua Tal", 110, "10100-111", "Manaus");
customer.setAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Find customer use case unit tests", () => {

  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123"
    };

    const output = {
      id: "123",
      name: "Customer 1",
      address: {
        street: "Rua Tal",
        number: 110,
        zip: "10100-111",
        city: "Manaus",
      },
    };

    const result = await findCustomerUseCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error when id is not found", async () => {
    const customerRepository = MockRepository();
    
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123"
    };

    expect(() => {
      return findCustomerUseCase.execute(input)
    }).rejects.toThrow("Customer not found")
  })
});
