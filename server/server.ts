import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import http from "http";
//import jwtDecode from "jwt-decode";
import mongoose from "mongoose";
import { CheckJWT } from "./middleware/CheckJWT";
import { routerAccount } from "./routers/routerAccount";
import { routerMailNotifications } from "./routers/routerMailNotifications";
import { routerPing } from "./routers/routerPing";
import { routerUser } from "./routers/routerUser";

const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID;
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
export const app = express();
app.use(function (req, res, next) {
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

const httpServer = http.createServer(app);

mongoose.set("strictQuery", true);
//mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECTION_STRING!);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(`Connected to MongoDB`));

app.post("/token", async (req, res) => {
  const client = new OAuth2Client(CLIENT_ID);
  const token = req.headers.authorization?.split(" ").at(-1);
  console.log("start Check");
  const ticket = await client.verifyIdToken({
    idToken: token!,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  console.log(ticket.getUserId());
  const payload = ticket.getPayload();
  const userid = payload!["sub"];
  const userEmail = payload!["email"];
  const userName = payload!["name"];
  const userExpire = payload!["exp"];
  const userIssuedAt = payload!["iat"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  // console.log(userid);
  // console.log(userEmail);
  // console.log(userName);
  // console.log(new Date(userExpire));
  // console.log(new Date(userIssuedAt));
  console.log(payload);
});

app.get("/hello-world", (req: Request, res: Response) => {
  res.send("Hello World");
});

httpServer.listen(process.env.PORT, () =>
  console.log(`⚡️Server is running on port ${process.env.PORT}⚡️`)
);
