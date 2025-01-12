import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../db/sequelize/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";


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

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: customer.street,
      number: customer.number,
      zip: customer.zip,
      city: customer.city,
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer.setAddress(address);
    await customerRepository.create(customer);

    customer.changeName("Diego");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: customer.street,
      number: customer.number,
      zip: customer.zip,
      city: customer.city,
      rewardPoints: customer.rewardPoints,
    });

    const address2 = new Address("Rua Top", 10, "20200-222", "Iranduba");

    customer.setAddress(address2);

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel2.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: customer.street,
      number: customer.number,
      zip: customer.zip,
      city: customer.city,
      rewardPoints: customer.rewardPoints,
    });

  })

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);
    expect(customer).toStrictEqual(customerResult);
  })

  it("should throw an error when customer is not found", ()=> {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("12345")
    }).rejects.toThrow("Customer not found.")
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer1.setAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();
    await customerRepository.create(customer1);

    const customer2 = new Customer("234", "Customer 2");
    const address2 = new Address("Rua top", 10, "20200-222", "Manaus");
    customer2.setAddress(address2);
    customer2.addRewardPoints(20);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1)
    expect(customers).toContainEqual(customer2);
  })

});
