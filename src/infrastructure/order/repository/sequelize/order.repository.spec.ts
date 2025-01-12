import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/db/sequelize/customer.model";
import OrderModel from "../../db/sequelize/order.model";
import OrderItemModel from "../../db/sequelize/order-item.model";
import ProductModel from "../../../product/db/sequelize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderRepository from "./order.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";

describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer1.setAddress(address1);
    await customerRepository.create(customer1);

    const productRepository = new ProductRepository();

    const product1 = new Product("prod1", "Prod 1", 100)
    await productRepository.create(product1);

    const orderItem = new OrderItem("1", product1.id, product1.name, product1.price, 3)

    const orderRepository = new OrderRepository();

    const order = new Order("o1", "123", [orderItem])
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
        where: {
            id: order.id
        },
        include: ["items"]
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "o1",
      customer_id: customer1.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "o1",
          product_id: "prod1",
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer1.setAddress(address1);
    await customerRepository.create(customer1);

    const productRepository = new ProductRepository();

    const product1 = new Product("prod1", "Prod 1", 100);
    await productRepository.create(product1);

    const orderItem1 = new OrderItem(
      "1",
      product1.id,
      product1.name,
      product1.price,
      3
    );

    const orderRepository = new OrderRepository();

    const order = new Order("o1", "123", [orderItem1]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "o1",
      customer_id: customer1.id,
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
          order_id: "o1",
          product_id: "prod1",
        },
      ],
    });
// ////////////////////////////////
    const product2 = new Product("prod2", "Prod 2", 500);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.id,
      product2.name,
      product2.price,
      1
    );

    order.addItem([orderItem2]);
    
    await orderRepository.update(order);

    const orderModel2 = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    // console.log(order)
    // console.log(orderModel2.toJSON())

    expect(orderModel2.toJSON()).toStrictEqual({
      id: "o1",
      customer_id: customer1.id,
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
          order_id: "o1",
          product_id: "prod1",
        },
        // {
        //   id: orderItem2.id,
        //   name: orderItem2.name,
        //   price: orderItem2.price,
        //   quantity: orderItem2.quantity,
        //   order_id: "o1",
        //   product_id: "prod2",
        // },
      ],
    });
    
  })

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer1.setAddress(address1);
    await customerRepository.create(customer1);

    const productRepository = new ProductRepository();

    const product1 = new Product("prod1", "Prod 1", 100);
    await productRepository.create(product1);

    const orderItem = new OrderItem(
      "1",
      product1.id,
      product1.name,
      product1.price,
      3
    );

    const orderRepository = new OrderRepository();

    const order = new Order("o1", "123", [orderItem]);
    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);
    expect(order).toStrictEqual(orderResult);
  });

  it("should find all orders", async () => {

    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer1.setAddress(address1);
    await customerRepository.create(customer1);


    const productRepository = new ProductRepository();

    const product1 = new Product("prod1", "Prod 1", 100);
    const product2 = new Product("prod2", "Prod 2", 1000);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem(
      "1",
      product1.id,
      product1.name,
      product1.price,
      3
    );
    const orderItem2 = new OrderItem(
      "2",
      product2.id,
      product2.name,
      product2.price,
      4
    );

    const orderRepository = new OrderRepository();

    const order1 = new Order("o1", "123", [orderItem1]);
    const order2 = new Order("o2", "123", [orderItem2]);

    await orderRepository.create(order1);
    await orderRepository.create(order2);
    const orders = await orderRepository.findAll();
    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  })

});
