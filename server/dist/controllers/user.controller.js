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
exports.UserController = void 0;
const connect_1 = require("../db/connect");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connect_1.pool.query("SELECT * FROM users");
            return res.json(result);
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Redaguojamo vartotojo ID
            const userId = req.params.id;
            //req.user.id  -- prisijungusio vartotojo id
            //req.user.type -- prisijungusio vartotojo tipas
            if (!(req.user.type == 0 || userId == req.user.id)) {
                res.status(400).json({
                    text: "Jūs neturite teisės redaguoti įrašą"
                });
            }
            const [result] = yield connect_1.pool.query("SELECT * FROM users WHERE id=?", [userId]);
            if (result.length == 0) {
                res.status(404).json({
                    text: "Vartotojas nerastas"
                });
            }
            else {
                res.json(result[0]);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Redaguojamo vartotojo ID
            const userId = req.params.id;
            //req.user.id  -- prisijungusio vartotojo id
            //req.user.type -- prisijungusio vartotojo tipas
            if (!(req.user.type == 0 || userId == req.user.id)) {
                res.status(400).json({
                    text: "Jūs neturite teisės redaguoti įrašą"
                });
            }
            if (req.body.password != '') {
                const passwordHash = yield bcrypt_1.default.hash(req.body.password, 12);
                yield connect_1.pool.query("UPDATE users SET email=?, name=?, password=?, type=? WHERE id=? ", [
                    req.body.email,
                    req.body.name,
                    passwordHash,
                    req.body.type,
                    userId
                ]);
            }
            else {
                yield connect_1.pool.query("UPDATE users SET email=?, name=?, type=? WHERE id=? ", [
                    req.body.email,
                    req.body.name,
                    req.body.type,
                    userId
                ]);
            }
            res.json({
                success: true
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connect_1.pool.query("DELETE FROM users WHERE id=?", [req.params.id]);
            res.json({
                success: true
            });
        });
    }
}
exports.UserController = UserController;
