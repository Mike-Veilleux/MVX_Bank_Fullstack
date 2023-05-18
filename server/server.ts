import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import { routerPing } from "./routers/routerPing";
import { routerUser } from "./routers/routerUser";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();
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

const httpServer = http.createServer(app);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION_STRING!);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(`Connected to MongoDB`));

app.get("/hello-world", (req: Request, res: Response) => {
  res.send("Hello World");
});

httpServer.listen(process.env.PORT, () =>
  console.log(`⚡️Server is running on port ${process.env.PORT}⚡️`)
);
