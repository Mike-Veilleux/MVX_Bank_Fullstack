"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const CheckJWT_1 = require("./middleware/CheckJWT");
const routerAccount_1 = require("./routers/routerAccount");
const routerMailNotifications_1 = require("./routers/routerMailNotifications");
const routerPing_1 = require("./routers/routerPing");
const routerUser_1 = require("./routers/routerUser");
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const app = (0, express_1.default)();
app.use(function (req, res, next) {
    res.header(
    // "Content-Security-Policy-Report-Only",
    "Content-Security-Policy", "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self' ; connect-src 'self' ws: https://ssl.gstatic.com;");
    res.header("Access-Control-Allow-Origin", req.header("origin"));
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: true,
}));
app.use("/ping", routerPing_1.routerPing);
app.use("/user", routerUser_1.routerUser);
app.use("/account", CheckJWT_1.CheckJWT, routerAccount_1.routerAccount);
app.use("/notification", CheckJWT_1.CheckJWT, routerMailNotifications_1.routerMailNotifications);
app.listen(process.env.API_PORT, () => console.log(`⚡️Server is running on port ${process.env.API_PORT}⚡️`));
