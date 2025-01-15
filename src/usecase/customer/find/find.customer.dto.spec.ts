import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/db/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("Customer repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  
  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer.setAddress(address);
    
    await customerRepository.create(customer);

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

    const result = findCustomerUseCase.execute(input);

    expect(output).toBe(result);
  })

});
