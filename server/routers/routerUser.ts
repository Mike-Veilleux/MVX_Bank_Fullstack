import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  User_CreateNew,
  User_GetGoogleCredentials,
  User_GetLocalCredentials,
  User_GetLoginType,
} from "../DAL/MongoDB/DAL";
import { IUserType } from "../interfaces/ENUMs";
import { IUser } from "../interfaces/IUser";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const routerUser = express.Router();

routerUser.post("/login-type", async (req: Request, res: Response) => {
  const loginType: IUserType | null = await User_GetLoginType(req.body.email);
  res.send(JSON.stringify(loginType));
});

routerUser.post("/new", async (req: Request, res: Response) => {
  const newUser: IUser | null | undefined = await User_CreateNew(
    req.body.newUser
  );
  res.send(newUser);
});

routerUser.post("/login-local", async (req: Request, res: Response) => {
  const user: IUser | null = await User_GetLocalCredentials(req.body.email);

  if (user === undefined || user === null) {
    res.status(204).send();
  } else {
    bcrypt.compare(
      req.body.password,
      user?.password!,
      (err: any, result: any) => {
        if (result === true) {
          const userID = user!._id;
          const token = jwt.sign(
            { value: userID },
            process.env.SESSION_TOKEN_SECRET!
          );

          res
            .cookie("mvx_jwt", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              maxAge: 9 * 60 * 60 * 1000, // hours x minutes x seconds x milliseconds
            })
            .send(user);
        } else {
          res.status(204).send();
        }
      }
    );
  }
});

routerUser.post("/login-google", async (req: Request, res: Response) => {
  const googleCredentials: IUser | null | undefined =
    await User_GetGoogleCredentials(req.body.email, req.body.googleID);
  if (googleCredentials === null) {
    res.status(204).send();
  } else {
    const userID = googleCredentials!._id;
    const token = jwt.sign(
      { value: userID },
      process.env.SESSION_TOKEN_SECRET!
    );

    res
      .cookie("mvx_jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 9 * 60 * 60 * 1000, // hours x minutes x seconds x milliseconds
      })
      .send(googleCredentials);
  }
});

routerUser.post("/logout", (req: Request, res: Response) => {
  const token = jwt.sign(
    { value: "Expired" },
    process.env.SESSION_TOKEN_SECRET!
  );
  res
    .cookie("mvx_jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 0,
    })
    .send({});
});
