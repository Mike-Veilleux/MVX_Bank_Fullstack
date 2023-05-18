import express, { Request, Response } from "express";
export const routerPing = express.Router();

routerPing.get("/", (req: Request, res: Response) => {
  res.send('<h1 style="text-align:center">You pinged me?</h1>');
});
