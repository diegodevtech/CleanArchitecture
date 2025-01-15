import Address from "../../../domain/customer/value-object/address";

export interface InputFindCustomerDTO {
  id: string;
}

export interface OutputFindCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string,
    number: number,
    zip: string,
    city: string,
  }
}