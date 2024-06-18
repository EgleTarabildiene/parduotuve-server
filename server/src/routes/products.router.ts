import express from 'express';
import { ProductsController } from '../controllers/products.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { editProductsMiddleware } from '../middlewares/edit.products.middleware';


const productsRouter=express.Router();

productsRouter.get("/",authMiddleware, ProductsController.getAll);
productsRouter.get("/:id", authMiddleware,editProductsMiddleware,  ProductsController.getProduct);
productsRouter.post("/",authMiddleware, editProductsMiddleware, ProductsController.insert);
productsRouter.put("/",authMiddleware, editProductsMiddleware, ProductsController.update);
productsRouter.delete("/:id",authMiddleware, editProductsMiddleware, ProductsController.delete);

export {productsRouter};