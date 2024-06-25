"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const dotenv_1 = __importDefault(require("dotenv"));
//Užkraunama .env biblioteka ir paimami kintamieji
dotenv_1.default.config();
console.log("Aplikacija paleista");
//Paleidžiame serverį ant PORTO kuris nurodytas process.env.PORT .env faile
app_js_1.app.listen(process.env.PORT, () => {
    console.log("Express serveris paleistas, ant uosto: " + process.env.PORT);
});
