"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPing = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
exports.routerPing = express_1.default.Router();
exports.routerPing.get("/", (req, res) => {
    res.send(`<h1 style="text-align:center">You pinged me? ${process.env.PORT}</h1>`);
});
