"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
const productsRouter = express_1.default.Router();
exports.productsRouter = productsRouter;
productsRouter.get("/", products_controller_1.ProductsController.getAll);
productsRouter.get("/:id", products_controller_1.ProductsController.getProduct);
productsRouter.post("/", products_controller_1.ProductsController.insert);
productsRouter.put("/", products_controller_1.ProductsController.update);
productsRouter.delete("/:id", products_controller_1.ProductsController.delete);
