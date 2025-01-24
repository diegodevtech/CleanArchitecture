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
    const createResponse = await request(app)
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

    expect(createResponse.statusCode).toBe(200);

    const updateResponse = await request(app)
      .put("/customer")
      .send({
        id: createResponse.body.id,
        name: "Diego updated",
        address: {
          street: "Rua",
          number: 1,
          zip: "33333-222",
          city: "Manaus",
        },
      });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.name).toBe("Diego updated");

  });
});
