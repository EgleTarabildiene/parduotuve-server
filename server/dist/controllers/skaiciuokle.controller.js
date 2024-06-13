"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkaiciuokleController = void 0;
class SkaiciuokleController {
    static apskaiciuoti(req, res) {
        console.log("Skaiciuojami rezultatai");
        const x = parseInt(req.body.x);
        const y = parseInt(req.body.y);
        console.log();
        res.json({
            "rezultatas": (x + y)
        });
    }
    static skaiciai(req, res) {
        res.json({
            "skaicius": 99
        });
    }
}
exports.SkaiciuokleController = SkaiciuokleController;
