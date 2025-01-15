import Address from "../../../domain/customer/value-object/address";

export interface InputFindCustomerDTO {
  id: string;
}

export interface OutputFindCustomerDTO {
  id: string;
  name: string;
  address: Address
}