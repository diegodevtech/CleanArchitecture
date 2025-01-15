import CreateCustomerUseCase from "./create";

const input = {
  name: "Diego",
  address: {
    street: "Rua",
    number: 1,
    zip: "Zip",
    city: "City",
  }
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Create customer use case unit tests", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await createCustomerUseCase.execute(input);

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      }
    });
  });

});