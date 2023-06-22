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
  const newUser: IUser | null | undefined | boolean = await User_CreateNew(
    req.body.newUser
  );
  //remove sensitive data - not needed in front end
  if (typeof newUser === "object") {
    newUser.password = "";
    newUser.googleID = "";
  }
  res.send(newUser);
});

routerUser.post("/login-local", async (req: Request, res: Response) => {
  const localUser: IUser | null = await User_GetLocalCredentials(
    req.body.email
  );

  if (localUser === undefined || localUser === null) {
    res.status(204).send();
  } else {
    bcrypt.compare(
      req.body.password,
      localUser?.password!,
      (err: any, result: any) => {
        if (result === true) {
          const userID = localUser!._id;
          const token = jwt.sign(
            { value: userID },
            process.env.SESSION_TOKEN_SECRET!
          );
          localUser.password = "";
          res
            .cookie("mvx_jwt", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              maxAge: 9 * 60 * 60 * 1000, // hours x minutes x seconds x milliseconds
            })
            .send(localUser);
        } else {
          res.status(204).send();
        }
      }
    );
  }
});

routerUser.post("/login-google", async (req: Request, res: Response) => {
  const googleUser: IUser | null | undefined = await User_GetGoogleCredentials(
    req.body.email
  );
  console.log("API - googleCredentials: ", googleUser?.googleID);
  if (googleUser === null) {
    res.status(204).send();
  } else {
    bcrypt.compare(
      req.body.googleID,
      googleUser.googleID!,
      (err: any, result: any) => {
        if (result === true) {
          const userID = googleUser!._id;
          const token = jwt.sign(
            { value: userID },
            process.env.SESSION_TOKEN_SECRET!
          );
          googleUser.googleID = "";
          res
            .cookie("mvx_jwt", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              maxAge: 9 * 60 * 60 * 1000, // hours x minutes x seconds x milliseconds
            })
            .send(googleUser);
        } else {
          res.status(204).send();
        }
      }
    );
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
