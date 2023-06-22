import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { CheckJWT } from "./middleware/CheckJWT";
import { setHeader } from "./middleware/SetHeader";
import { routerAccount } from "./routers/routerAccount";
import { routerMailNotifications } from "./routers/routerMailNotifications";
import { routerPing } from "./routers/routerPing";
import { routerUser } from "./routers/routerUser";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(setHeader);
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
