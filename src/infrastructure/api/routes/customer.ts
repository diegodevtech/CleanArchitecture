import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import { InputCreateCustomerDTO } from '../../../usecase/customer/create/create.dto';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try{
    const inputCustomerDTO: InputCreateCustomerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      }
    }

    const outputCreateCustomerDTO = await usecase.execute(inputCustomerDTO);
    res.send(outputCreateCustomerDTO);

  } catch (error) {
    res.status(500).send(error);
  }
})