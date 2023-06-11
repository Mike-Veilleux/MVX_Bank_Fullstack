"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMailNotifications = void 0;
const express_1 = __importDefault(require("express"));
const MailNotification_1 = require("../MailNotification/MailNotification");
exports.routerMailNotifications = express_1.default.Router();
exports.routerMailNotifications.post("/sendMail", (req, res) => {
    (0, MailNotification_1.sendMail)(req.body.recipient_email, req.body.message);
});
