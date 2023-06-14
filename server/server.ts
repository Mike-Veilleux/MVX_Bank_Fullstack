import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { CheckJWT } from "./middleware/CheckJWT";
import { routerAccount } from "./routers/routerAccount";
import { routerMailNotifications } from "./routers/routerMailNotifications";
import { routerPing } from "./routers/routerPing";
import { routerUser } from "./routers/routerUser";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(function (req, res, next) {
  res.header(
    // "Content-Security-Policy-Report-Only",
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self' ; connect-src 'self' ws: https://ssl.gstatic.com;"
  );
  res.header("Access-Control-Allow-Origin", req.header("origin"));
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use("/ping", routerPing);
app.use("/user", routerUser);
app.use("/account", CheckJWT, routerAccount);
app.use("/notification", CheckJWT, routerMailNotifications);

app.listen(process.env.API_PORT, () =>
  console.log(`⚡️Server is running on port ${process.env.API_PORT}⚡️`)
);
