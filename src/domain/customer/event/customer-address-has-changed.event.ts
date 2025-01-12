import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

export type CustomerAddressHasChangedEventMessageType = {
  id: string;
  name: string;
  address: Address;
}

export default class CustomerAddressHasChangedEvent implements EventInterface {
  dataTimeOcurred: Date;
  eventData: CustomerAddressHasChangedEventMessageType;

  constructor(eventData: CustomerAddressHasChangedEventMessageType) {
    this.dataTimeOcurred = new Date();
    this.eventData = eventData;
  }
}