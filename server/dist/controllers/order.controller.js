"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const connect_1 = require("../db/connect");
class OrderController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM orders";
            const [result] = yield connect_1.pool.query(sql);
            // await result.forEach(async (order,index)=>{
            for (let i = 0; i < result.length; i++) {
                const sql2 = "SELECT product_id as productId, count FROM orders_products WHERE order_id=?";
                const [products] = yield connect_1.pool.query(sql2, [result[i].id]);
                result[i].products = products;
                console.log(products);
            }
            // });
            console.log(result);
            res.json(result);
        });
    }
    static getOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM orders WHERE id=? ";
            const [result] = yield connect_1.pool.query(sql, [req.params.id]);
            if (result.length == 0) {
                res.status(404).json({
                    'text': 'Pateiktas įrašas nerastas'
                });
            }
            else {
                res.json(result[0]);
            }
        });
    }
    static insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.body;
            const sql = "INSERT INTO orders (name, surname) VALUES ( ?, ? )";
            const [result, fields] = yield connect_1.pool.query(sql, [order.name, order.surname]);
            const insertId = result.insertId;
            order.products.forEach((product) => __awaiter(this, void 0, void 0, function* () {
                const sql2 = "INSERT INTO orders_products (order_id, product_id, count) VALUES (?, ?, ?)";
                yield connect_1.pool.query(sql2, [insertId, product.productId, product.count]);
            }));
            res.status(201).json({
                "success": true
            });
        });
    }
}
exports.OrderController = OrderController;
