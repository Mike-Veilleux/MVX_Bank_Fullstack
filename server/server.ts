import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
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
    "default-src 'self' ws: https://ssl.gstatic.com; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
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

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION_STRING!);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(`Connected to MongoDB`));

app.listen(process.env.API_PORT, () =>
  console.log(`⚡️Server is running on port ${process.env.API_PORT}⚡️`)
);
