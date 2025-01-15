export interface InputCreateCustomerDTO {
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}

export interface OutputCreateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}