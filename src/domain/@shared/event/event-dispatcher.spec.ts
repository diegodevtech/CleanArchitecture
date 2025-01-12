import Customer from "../../customer/entity/customer";
import CustomerAddressHasChangedEvent from "../../customer/event/customer-address-has-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/sendEmailWhenProductIsCreated.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Event Domain Tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all registered handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const productEventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyProductEventHandler = jest.spyOn(productEventHandler, "handle");

    const customerEventHandler1 = new EnviaConsoleLog1Handler();
    const spyCustomerEventHandler1 = jest.spyOn(customerEventHandler1, "handle");
    const customerEventHandler2 = new EnviaConsoleLog2Handler();
    const spyCustomerEventHandler2 = jest.spyOn(customerEventHandler2, "handle");

    const customer = new Customer("123", "Diego");
    const address = new Address("Rua tal", 111, "68118-116", "Manaus");
    customer.setAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true);

    eventDispatcher.register("ProductCreatedEvent", productEventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(productEventHandler);

    eventDispatcher.register("CustomerCreatedEvent", customerEventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", customerEventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customerEventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(customerEventHandler2);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Description top",
      price: 20.0
    });

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      address: address,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    })

    // quando notify() executar o SendEmailWhenProductIsCreatedHandler.handle() sera executado
    eventDispatcher.notify(productCreatedEvent)
    expect(spyProductEventHandler).toHaveBeenCalled()

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyCustomerEventHandler1).toHaveBeenCalled();
    expect(spyCustomerEventHandler2).toHaveBeenCalled();
  });

  it("should notify after customer address change", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyCustomerAddressHasChangedHandler = jest.spyOn(eventHandler, "handle")

    const customer = new Customer("123", "Diego");
    const address = new Address("Rua tal", 111, "68118-116", "Manaus");
    customer.setAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true);
    
    const address2 = new Address("Rua Top", 2, "69212-212", "Manaus");
    // o nome da minha função foi definida como setAddress() e não changeAddress() apenas por fazer mais sentido para mim.
    customer.setAddress(address2);

    // Observe que o nome dado ao registro do evento deve ser o mesmo nome da classe do evento
    eventDispatcher.register("CustomerAddressHasChangedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressHasChangedEvent"][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressHasChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressHasChangedEvent"].length).toBe(1);

    const customerAddressHasChangedEvent = new CustomerAddressHasChangedEvent({
      id: customer.id,
      name: customer.name,
      address: address2
    });

    eventDispatcher.notify(customerAddressHasChangedEvent);
    expect(spyCustomerAddressHasChangedHandler).toHaveBeenCalled();
  });
})
