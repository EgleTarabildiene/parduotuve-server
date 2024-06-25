"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const multer_1 = __importDefault(require("multer"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get("/", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, user_controller_1.UserController.getAll);
userRouter.get("/:id", auth_middleware_1.authMiddleware, user_controller_1.UserController.getUser);
userRouter.put("/:id", auth_middleware_1.authMiddleware, user_controller_1.UserController.update);
userRouter.delete("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, user_controller_1.UserController.delete);
const storageProfileImages = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './img');
    },
    filename: (req, file, cb) => {
        const userId = req.params.id;
        const fileName = "p_" + userId + "_" + Date.now() + ".jpg";
        cb(null, fileName);
    }
});
userRouter.post("/:id", auth_middleware_1.authMiddleware, (0, multer_1.default)({ storage: storageProfileImages }).single('image'), user_controller_1.UserController.updateProfile);
