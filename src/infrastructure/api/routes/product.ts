import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list';
import UpdateProductUseCase from '../../../usecase/product/update/update';
import { InputCreateProductDTO } from '../../../usecase/product/create/create.dto';
import { InputUpdateProductDTO } from '../../../usecase/product/update/update.dto';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const inputCreateProductDTO: InputCreateProductDTO = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    };

    const outputCreateProductDTO = await usecase.execute(inputCreateProductDTO);
    res.send(outputCreateProductDTO);
  } catch (error) {
    res.status(500).send();
  }

});

productRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send();
  }

});

productRoute.put('/', async (req: Request, res: Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository());

  try {
    const inputUpdateProductDTO: InputUpdateProductDTO = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };

    const outputUpdateProductDTO = await usecase.execute(inputUpdateProductDTO);
    res.send(outputUpdateProductDTO);
  } catch (error) {
    res.status(500).send();
  }
});