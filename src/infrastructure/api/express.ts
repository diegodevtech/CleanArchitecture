import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/db/sequelize/customer.model";
import { customerRoute } from "./routes/customer";
import ProductModel from "../product/db/sequelize/product.model";
import { productRoute } from "./routes/product";

export const app: Express = express();
app.use(express.json());
app.use('/customer', customerRoute);
app.use('/product', productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false, 
  });
  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDb();
