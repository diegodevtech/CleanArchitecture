import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../../db/sequelize/order-item.model";
import OrderModel from "../../db/sequelize/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try{
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {
      throw new Error("Unable to create order.")
    }
  }

  async update(entity: Order): Promise<void> {
    try {
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          where: { id: entity.id },
        }
      );
    } catch (error) {
      throw new Error("Unable to update order.")
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel}],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found.");
    }

    const orderItems = orderModel.items.map((item) => {
      let orderItem = new OrderItem(
        item.id,
        item.product_id,
        item.name,
        item.price,
        item.quantity
      );
      return orderItem;
    });

    const order = new Order(id, orderModel.customer_id, orderItems);

    return order;

  }

  async findAll(): Promise<Order[]> {
    let orderModels;

    try {
      orderModels = await OrderModel.findAll({
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error("Orders not found.");
    }

    const allOrders = orderModels.map((order) => {
      const orderItems = order.items.map((item) => {
        let orderItem = new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity
        );
        return orderItem;
      })
      const orderResult = new Order(order.id, order.customer_id, orderItems);

      return orderResult;
    });

    return allOrders;
  }
}
