"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckJWT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
function CheckJWT(req, res, next) {
    const token = req.cookies.mvx_jwt;
    if (token == null) {
        res.status(401);
    }
    else {
        jsonwebtoken_1.default.verify(token, process.env.SESSION_TOKEN_SECRET, (err, result) => {
            if (err)
                return res.sendStatus(403);
            //@ts-ignore
            req.user = result.value;
        });
    }
    next();
}
exports.CheckJWT = CheckJWT;
