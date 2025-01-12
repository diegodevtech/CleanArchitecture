import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressHasChangedEvent from "../customer-address-has-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressHasChangedEvent> {
  handle(event: CustomerAddressHasChangedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`)
  }
}