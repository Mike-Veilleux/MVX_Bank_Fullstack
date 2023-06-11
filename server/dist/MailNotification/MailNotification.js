"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.GMAIL_SMTP_USER,
        pass: process.env.GMAIL_SMTP_PASSWORD,
    },
});
function sendMail(recipient, message) {
    transporter
        .sendMail({
        from: '"MVX Banking App" <mvxdesign.hk@gmail.com>',
        to: recipient,
        subject: "New notification 🤨",
        html: `<p>
      This is an automated message from MVX Bank.
      <br />
      ${message}
    </p>`, // html body
    })
        .then(
    //@ts-ignore
    (info) => {
        console.log({ info });
    })
        .catch(console.error);
}
exports.sendMail = sendMail;
