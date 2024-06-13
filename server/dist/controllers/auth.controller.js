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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const connect_1 = require("../db/connect");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name;
            const email = req.body.email;
            let password = req.body.password;
            password = yield bcrypt_1.default.hash(password, 12);
            const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            yield connect_1.pool.query(sql, [name, email, password]);
            res.json({ "status": "ok" });
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const sql = "SELECT * FROM users WHERE email like ?";
            const [result] = yield connect_1.pool.query(sql, [email]);
            if (result.length != 1) {
                return res.status(400).json({
                    'text': 'Vartotojas su tokiu el. pašto adresu neegzistuoja'
                });
            }
            const user = result[0];
            let passwordOk = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordOk) {
                return res.status(400).json({
                    'text': 'Įvestas neteisingas slaptažodis arba el. pašto adresas'
                });
            }
            let token = jsonwebtoken_1.default.sign({
                id: user.id
            }, "kk59444gsd4r9+-eyery64er94ty9wer49erh4", {
                expiresIn: '2 days'
            });
            //const k=jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE4MjY0Njk3LCJleHAiOjE3MTg0Mzc0OTd9.2CXay21b6mJVcGTRK_MejAjP1f53jmjvx5wpGtqD_UU","kk59444gsd4r9+-eyery64er94ty9wer49erh4");    
            //console.log(k);
            res.json({
                'name': user.name,
                'email': user.email,
                'token': token
            });
        });
    }
}
exports.AuthController = AuthController;
