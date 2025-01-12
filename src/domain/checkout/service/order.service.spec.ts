import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item"
import OrderService from "./order.service";

describe("Order Service Unit Tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1")
        const orderItem1 = new OrderItem("oi1", "prod1", "Order Item 1", 60, 1)
        const order1 = OrderService.placeOrder(customer, [orderItem1])

        expect(customer.rewardPoints).toBe(30)
        expect(order1).toBeInstanceOf(Order)
    
    })
    it("should get total of all orders", () => {
        const item = new OrderItem("123", "234", "Prod1", 10, 2);
        const item2 = new OrderItem("234", "345", "Prod1", 20, 1);

        const order = new Order("1", "234", [item])
        const order2 = new Order("2", "345", [item2]);

        const total = OrderService.total([order, order2])
        expect(total).toBe(40)
    })
})