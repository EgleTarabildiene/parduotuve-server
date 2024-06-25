"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const ordersRouter = express_1.default.Router();
exports.ordersRouter = ordersRouter;
ordersRouter.get('/', auth_middleware_1.authMiddleware, order_controller_1.OrderController.getAll);
ordersRouter.get('/:id', auth_middleware_1.authMiddleware, order_controller_1.OrderController.getOrder);
ordersRouter.post('/', auth_middleware_1.authMiddleware, order_controller_1.OrderController.insert);
