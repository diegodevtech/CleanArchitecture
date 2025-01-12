import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "../../db/sequelize/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      street: entity.street,
      number: entity.number,
      zip: entity.zip,
      city: entity.city,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      active: entity.isActive(),
      street: entity.street,
      number: entity.number,
      zip: entity.zip,
      city: entity.city,
      rewardPoints: entity.rewardPoints,
    },
    {
      where: {
        id: entity.id
      }
    }
  );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    
    try{
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found.");
    }

    const customer = new Customer(id, customerModel.name);

    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.city
    )

    customer.setAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    const customers = customerModels.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name)
      customer.addRewardPoints(customerModel.rewardPoints);

      const address = new Address(
        customerModel.street, customerModel.number, customerModel.zip, customerModel.city
      )
      customer.setAddress(address);
      
      if(customerModel.active){
        customer.activate();
      }

      return customer;
    });

    return customers;
  }
}