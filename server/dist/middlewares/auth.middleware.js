"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.auth;
        dotenv_1.default.config();
        if (process.env.TOKEN_SECRET != null) {
            const user = (jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET));
            req.user = user;
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            'text': 'Nepateiktas arba neteisingas JWT'
        });
    }
};
exports.authMiddleware = authMiddleware;
