import dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
export const routerPing = express.Router();

routerPing.get("/", (req: Request, res: Response) => {
  res.send(`<h1 style="text-align:center">You pinged me?</h1>`);
});

routerPing.get("/port", (req: Request, res: Response) => {
  res.send(
    `<h1 style="text-align:center">You pinged me? ${process.env.PORT}</h1>`
  );
});
