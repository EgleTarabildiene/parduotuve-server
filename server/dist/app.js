"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const skaiciuokle_router_1 = require("./routes/skaiciuokle.router");
const cors_middleware_1 = require("./middlewares/cors.middleware");
const products_router_1 = require("./routes/products.router");
const auth_router_1 = require("./routes/auth.router");
const user_router_1 = require("./routes/user.router");
const path_1 = __importDefault(require("path"));
const orders_router_1 = require("./routes/orders.router");
const app = (0, express_1.default)();
exports.app = app;
//Sutvarkomi duomenys jei buvo siusta forma
app.use(express_1.default.urlencoded({ extended: false }));
//Sutvarkomi duomenys jei buvo atsiustas JSON failas
app.use(express_1.default.json());
//Į visus response header'ius įkeliame CORS nurodymus
app.use(cors_middleware_1.corsHeaders);
app.use("/img", express_1.default.static(path_1.default.join("./img")));
//Užkrauname route failą (kur nurodyti skaičiuoklės url)
app.use('/skaiciuokle', skaiciuokle_router_1.skaiciuokleRouter);
app.use('/products', products_router_1.productsRouter);
app.use('/auth', auth_router_1.authRouter);
app.use("/users", user_router_1.userRouter);
app.use("/orders", orders_router_1.ordersRouter);
