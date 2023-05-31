import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.GMAIL_SMTP_USER,
    pass: process.env.GMAIL_SMTP_PASSWORD,
  },
});

export function sendMail(recipient: string, message: string) {
  transporter
    .sendMail({
      from: '"MVX Banking App" <mvxdesign.hk@gmail.com>', // sender address
      to: recipient, // list of receivers
      subject: "New notification 🤨", // Subject line
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
      }
    )
    .catch(console.error);
}
