import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import Address from "../value-object/address";

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuid(), name)
  }
  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name)
    customer.setAddress(address);
    return customer;
  }
}