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
const app = (0, express_1.default)();
exports.app = app;
//Sutvarkomi duomenys jei buvo siusta forma
app.use(express_1.default.urlencoded());
//Sutvarkomi duomenys jei buvo atsiustas JSON failas
app.use(express_1.default.json());
//I visus respose hederius ikeliame CORS nurodymus 
app.use(cors_middleware_1.corsHeaders);
//Uzkrauname rautu faila(kur nurodyta skaiciuokles url)
app.use('/skaiciuokle', skaiciuokle_router_1.skaiciuokleRouter);
app.use('/products', products_router_1.productsRouter);
app.use('/auth', auth_router_1.authRouter);
