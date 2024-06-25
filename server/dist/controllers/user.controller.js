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
const path_1 = __importDefault(require("path"));
const connect_1 = require("../db/connect");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
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
    static updateUserRecord(id, email, name, password, type, fileURL) {
        return __awaiter(this, void 0, void 0, function* () {
            if (password != '') {
                const passwordHash = yield bcrypt_1.default.hash(password, 12);
                yield connect_1.pool.query("UPDATE users SET email=?, name=?, password=? WHERE id=? ", [
                    email,
                    name,
                    passwordHash,
                    id
                ]);
            }
            else {
                yield connect_1.pool.query("UPDATE users SET email=?, name=? WHERE id=? ", [
                    email,
                    name,
                    id
                ]);
            }
            if (type != null) {
                yield connect_1.pool.query("UPDATE users SET type=? WHERE id=? ", [
                    type,
                    id
                ]);
            }
            if (fileURL != null) {
                //Pasiimame buvusią informaciją iš DB
                const [oldUser] = yield connect_1.pool.query("SELECT * FROM users WHERE id=?", [id]);
                //Ištriname failą
                fs_1.default.unlinkSync(path_1.default.join('./img/' + oldUser[0].img.split('/').pop()));
                yield connect_1.pool.query("UPDATE users SET img=? WHERE id=? ", [
                    fileURL,
                    id
                ]);
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
            yield UserController.updateUserRecord(userId, req.body.email, req.body.name, req.body.password, req.body.type, null);
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
    static updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            console.log("Vartotojo profilis atnaujintas");
            console.log(req.body);
            const url = req.protocol + "://" + req.get("host") + "/img/" + req.file.filename;
            UserController.updateUserRecord(userId, req.body.email, req.body.name, req.body.password, null, url);
            res.json({
                success: true
            });
        });
    }
}
exports.UserController = UserController;
