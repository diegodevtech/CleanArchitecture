import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
      order.validate();
    }).toThrow("ID is required.");
  });

  it("should throw an error when customer id is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
      order.validate();
    }).toThrow("Customer ID is required.");
  });

  it("should throw an error when item list is empty", () => {
    expect(() => {
      const order = new Order("123", "123", []);
      order.validate();
    }).toThrow(
      "A list of items is required and must have length greater than zero."
    );
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("123", "234", "Item 1", 1, 1);
    const item2 = new OrderItem("1234", "2345", "Item 2", 10, 2);
    const item3 = new OrderItem("12345", "23456", "Item 3", 100, 3);

    const order = new Order("1", "12", [item1, item2, item3]);
    const total = order.total();

    expect(total).toBe(321);

    const order2 = new Order("111", "123", [item1, item3]);
    const total2 = order2.total();

    expect(total2).toBe(301);
  });

  it("should throw error if quantity were less or equal to zero", () => {
    expect(() => {
      const item = new OrderItem("123", "234", "Item 1", 1, 0);
      const order = new Order("1", "12", [item]);
    }).toThrow("Quantity must be grater than zero.");

    expect(() => {
      const item = new OrderItem("123", "234", "Item 1", 1, -1);
      const order = new Order("1", "12", [item]);
    }).toThrow("Quantity must be grater than zero.");
  });

  it("should return the order item price", () => {
    const item = new OrderItem("123", "234", "Item 1", 10, 1);
    const price = item.price
    expect(price).toBe(10)
  })
});
