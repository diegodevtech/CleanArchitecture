import { sequelize, app } from "../express";
import request from 'supertest';

describe("Customer E2E tests", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
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

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Diego");
      expect(response.body.address.street).toBe("Rua");
      expect(response.body.address.number).toBe(1);
      expect(response.body.address.zip).toBe("33333-222");
      expect(response.body.address.city).toBe("Manaus");
  })
})