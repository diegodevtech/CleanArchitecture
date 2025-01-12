import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps {
  id: string,
  customerId: string,
  items: {
    id: string,
    name: string,
    productId: string,
    quantity: number,
    price: number
  }[]
}

export default class OrderFactory {
  public static create(orderProps: OrderFactoryProps): Order {
    const items = orderProps.items.map((item) => {
      return new OrderItem(
        item.id,
        item.productId,
        item.name,
        item.price,
        item.quantity
      );
    });

    return new Order(orderProps.id, orderProps.customerId, items)
  }
}