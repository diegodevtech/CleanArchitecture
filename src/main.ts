import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";


let customer = new Customer("123", "Diego");
const address = new Address("Rua tal", 111,"69095-626","Manaus")
customer.setAddress(address)
customer.activate()

const item1 = new OrderItem("1", "123", "Item1", 1, 10);
const item2 = new OrderItem("2", "124", "Item 2", 1, 15);
const order = new Order("1", "123", [item1, item2])

// comentario

