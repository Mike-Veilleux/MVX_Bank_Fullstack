import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export function CheckJWT(req: Request, res: Response, next: NextFunction) {
  console.log("Entering CheckJWT...");
  const token = req.cookies.mvx_jwt;
  console.log("Encoded Token: ", token);
  console.log("Raw Cookie: ", req.cookies);
  if (token == null) {
    res.status(401);
  } else {
    jwt.verify(
      token,
      process.env.SESSION_TOKEN_SECRET!,
      (err: any, result: any) => {
        if (err) return res.sendStatus(403);
        req.user = result.value;
        console.log("Decoded token:", result);
        console.log("Token is valid!");
      }
    );
  }
  next();
}
