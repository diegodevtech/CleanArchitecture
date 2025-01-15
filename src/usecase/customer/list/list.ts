import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDTO, OutputListCustomerDTO } from "./list.dto";

class OutputMapper {
  static toOutput(customersArray: Customer[]): OutputListCustomerDTO {
    return {
      customers: customersArray.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.street,
          number: customer.number,
          zip: customer.zip,
          city: customer.city
        }
      }))
    }
  }
}

export default class ListCustomerUseCase {
  
  private customerRepository: CustomerRepositoryInterface;
  
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  };
  
  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}