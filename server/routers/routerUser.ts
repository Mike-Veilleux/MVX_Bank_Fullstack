import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserType } from "../interfaces/ENUMs";
import { IUser, User } from "../interfaces/IUser";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const routerUser = express.Router();

routerUser.post("/login-local", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const user: IUser | null | undefined = await User.findOne({
    email: email,
  });

  if (user === undefined || user === null) {
    res.status(204).send();
  } else {
    bcrypt.compare(password, user?.password!, (err: any, result: any) => {
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
    });
  }
});

routerUser.post("/login-google", async (req: Request, res: Response) => {
  const email = req.body.email;
  const googleID = req.body.googleID;
  const user: IUser | null | undefined = await User.findOne({
    email: email,
    googleID: googleID,
  });
  if (user === undefined || user === null) {
    res.status(204).send();
  } else {
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
  }
});

routerUser.post("/login-type", async (req: Request, res: Response) => {
  const email = req.body.email;
  const user: IUser | null = await User.findOne({ email: email });
  let userType: IUserType | null = null;
  if (user === null) {
    userType = IUserType.NONE;
  } else if (user.password !== "") {
    userType = IUserType.LOCAL;
  } else if (user.googleID !== "") {
    userType = IUserType.GOOGLE;
  }

  res.send(JSON.stringify(userType));
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

routerUser.post("/new", async (req: Request, res: Response) => {
  const newUser: IUser = req.body.user;
  const matchingUser = await User.findOne({ email: newUser.email });
  if (!matchingUser) {
    const result = new User(newUser);
    result.save((err, newUser) => {
      if (err) return console.log(err);
      res.status(201).send(newUser);
    });
  } else {
    res.status(205).send("Email already exist!");
  }
});
