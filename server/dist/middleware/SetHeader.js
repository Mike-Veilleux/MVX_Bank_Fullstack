"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHeader = void 0;
function setHeader(req, res, next) {
    res.header("Content-Security-Policy", "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self' ; connect-src 'self' ws: https://accounts.google.com/gsi/client;");
    res.header("Access-Control-Allow-Origin", req.header("origin"));
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
}
exports.setHeader = setHeader;
