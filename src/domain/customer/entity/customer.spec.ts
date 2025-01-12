import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Teste");
    }).toThrow("ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    let customer = new Customer("123","Diego")
    customer.changeName("Diego top")
    expect(customer.name).toBe("Diego top")
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "Diego");
    const address = new Address("Rua tal", 111, "69095-626", "Manaus");
    customer.setAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true);
  })

  it("should deactivate customer", () => {
    const customer = new Customer("123", "Diego");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined", () => {
      expect(() => {
        const customer = new Customer("123", "Diego");
        customer.activate();
      }).toThrow("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("c1", "Customer 1")
    
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(20);
    
  })
});
