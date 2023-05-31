import express, { Request, Response } from "express";
import { sendMail } from "../MailNotification/MailNotification";
export const routerMailNotifications = express.Router();

routerMailNotifications.post("/sendMail", (req: Request, res: Response) => {
  sendMail(req.body.recipient_email, req.body.message);
});
