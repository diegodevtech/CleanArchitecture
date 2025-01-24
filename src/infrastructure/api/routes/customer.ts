import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import { InputCreateCustomerDTO } from '../../../usecase/customer/create/create.dto';
import ListCustomerUseCase from '../../../usecase/customer/list/list';
import UpdateCustomerUseCase from '../../../usecase/customer/update/update';
import { InputUpdateCustomerDTO } from '../../../usecase/customer/update/update.dto';

// customerRoute.post('/', async (req: Request, res: Response) => {});
export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try{
    const inputCreateCustomerDTO: InputCreateCustomerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      }
    }

    const outputCreateCustomerDTO = await usecase.execute(inputCreateCustomerDTO);
    res.send(outputCreateCustomerDTO);

  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const outputListCustomerDTO = await usecase.execute({});
    res.send(outputListCustomerDTO);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.put('/', async (req: Request, res: Response) => {
  const usecase = new UpdateCustomerUseCase(new CustomerRepository());

  try {
    const inputUpdateCustomerDTO: InputUpdateCustomerDTO = {
      id: req.body.id,
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      }
    };

    const outputUpdateCustomerDTO = await usecase.execute(inputUpdateCustomerDTO);
    res.send(outputUpdateCustomerDTO);
  } catch (error) {
    res.status(500).send(error);
  }
});