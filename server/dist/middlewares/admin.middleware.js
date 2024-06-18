"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const adminMiddleware = (req, res, next) => {
    if (req.user == null) {
        return res.status(401).json({
            'text': 'Vartotojas nėra prisijungęs'
        });
    }
    if (req.user.type == 0) {
        next();
    }
    else {
        return res.status(401).json({
            'text': 'Vartotojas neturi teisių atlikti veiksmus'
        });
    }
};
exports.adminMiddleware = adminMiddleware;
