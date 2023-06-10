import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export function CheckJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.mvx_jwt;
  if (token == null) {
    res.status(401);
  } else {
    jwt.verify(
      token,
      process.env.SESSION_TOKEN_SECRET!,
      (err: any, result: any) => {
        if (err) return res.sendStatus(403);
        //@ts-ignore
        req.user = result.value;
      }
    );
  }
  next();
}
