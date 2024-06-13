import express from 'express';
import { ProductsController } from '../controllers/products.controller';


const productsRouter=express.Router();

productsRouter.get("/", ProductsController.getAll);
productsRouter.get("/:id", ProductsController.getProduct);
productsRouter.post("/", ProductsController.insert);
productsRouter.put("/", ProductsController.update);
productsRouter.delete("/:id", ProductsController.delete);

export {productsRouter};