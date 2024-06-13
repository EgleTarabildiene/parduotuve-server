"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skaiciuokleRouter = void 0;
const express_1 = __importDefault(require("express"));
const skaiciuokle_controller_js_1 = require("../controllers/skaiciuokle.controller.js");
const skaiciuokleRouter = express_1.default.Router();
exports.skaiciuokleRouter = skaiciuokleRouter;
skaiciuokleRouter.post('/skaiciuoti', skaiciuokle_controller_js_1.SkaiciuokleController.apskaiciuoti);
skaiciuokleRouter.get('/skaiciai', skaiciuokle_controller_js_1.SkaiciuokleController.skaiciai);
