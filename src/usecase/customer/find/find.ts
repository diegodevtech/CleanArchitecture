import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.dto";

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.find(input.id)
    // NÃO MANDAR A ENTITY NO RETORNO E SIM O DTO, VENÇA A TENTAÇÃO
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.street,
        number: customer.number,
        zip: customer.zip,
        city: customer.city,
      }
    }
  }
}