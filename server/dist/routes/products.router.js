"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const edit_products_middleware_1 = require("../middlewares/edit.products.middleware");
const productsRouter = express_1.default.Router();
exports.productsRouter = productsRouter;
productsRouter.get("/", auth_middleware_1.authMiddleware, products_controller_1.ProductsController.getAll);
productsRouter.get("/:id", auth_middleware_1.authMiddleware, edit_products_middleware_1.editProductsMiddleware, products_controller_1.ProductsController.getProduct);
productsRouter.post("/", auth_middleware_1.authMiddleware, edit_products_middleware_1.editProductsMiddleware, products_controller_1.ProductsController.insert);
productsRouter.put("/", auth_middleware_1.authMiddleware, edit_products_middleware_1.editProductsMiddleware, products_controller_1.ProductsController.update);
productsRouter.delete("/:id", auth_middleware_1.authMiddleware, edit_products_middleware_1.editProductsMiddleware, products_controller_1.ProductsController.delete);
