"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPing = void 0;
const express_1 = __importDefault(require("express"));
exports.routerPing = express_1.default.Router();
exports.routerPing.get("/", (req, res) => {
    res.send('<h1 style="text-align:center">You pinged me?</h1>');
});
