import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "../../../usecase/customer/find/find";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import { sequelize, app } from "../express";
import request from "supertest";

describe("Customer E2E tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Diego",
        address: {
          street: "Rua",
          number: 1,
          zip: "33333-222",
          city: "Manaus",
        },
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Diego");
    expect(response.body.address.street).toBe("Rua");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.zip).toBe("33333-222");
    expect(response.body.address.city).toBe("Manaus");
  });

  it("should throw error when customer is invalid", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Diego",
        address: {
          street: "Rua",
          number: 1,
          // zip: "33333-222",
          city: "Manaus",
        },
      });

    expect(response.statusCode).toBe(500);
  });

  it("should list all customers", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Diego",
        address: {
          street: "Rua",
          number: 1,
          zip: "33333-222",
          city: "Manaus",
        },
      });

    expect(response.statusCode).toBe(200);

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Diego2",
        address: {
          street: "Rua2",
          number: 2,
          zip: "33333-222",
          city: "Manaus2",
        },
      });

    expect(response2.statusCode).toBe(200);

    const listOfCustomers = await request(app).get("/customer").send();

    expect(listOfCustomers.statusCode).toBe(200);
    expect(listOfCustomers.body.customers.length).toBe(2);
    expect(listOfCustomers.body.customers[0].name).toBe("Diego");
    expect(listOfCustomers.body.customers[0].address.street).toBe("Rua");
    expect(listOfCustomers.body.customers[1].name).toBe("Diego2");
    expect(listOfCustomers.body.customers[1].address.street).toBe("Rua2");
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua Tal", 110, "10100-111", "Manaus");
    customer.setAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: "123",
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

    const updateResponse = await request(app)
      .put("/customer")
      .send({
        id: customer.id,
        name: "Diego updated",
        address: {
          street: "Nova rua updated",
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city,
        },
      });
    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.name).toEqual("Diego updated")
    expect(updateResponse.body.address.street).toEqual("Nova rua updated")
    expect(updateResponse.body.address.city).toEqual("Manaus")
  });
});
