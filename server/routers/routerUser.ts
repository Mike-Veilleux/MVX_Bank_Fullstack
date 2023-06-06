import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, User } from "../interfaces/IUser";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const routerUser = express.Router();

routerUser.post("/auth-local", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user: IUser | null | undefined = await User.findOne({
    email: email,
    password: password,
  });
  if (user === undefined) {
    res.status(204).send();
  } else {
    const userID = user!._id;
    console.log(userID);
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

routerUser.post("/auth-google", async (req: Request, res: Response) => {
  const email = req.body.email;
  const googleID = req.body.googleID;
  const user: IUser | null | undefined = await User.findOne({
    email: email,
    googleID: googleID,
  });
  console.log("DB User: ", user);
  if (user === undefined || user === null) {
    res.status(204).send();
  } else {
    const userID = user!._id;
    console.log(userID);
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

routerUser.post("/get-by-email", async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await User.find({ email: email });

  if (user === null || user.length == 0) {
    res.status(204).send();
    console.log(`${email} not found!`);
  } else {
    console.log(user);
    res.status(200).send(user);
  }
});

routerUser.post("/login", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user: IUser | null | undefined = await User.findOne({
    email: email,
    password: password,
  });

  console.log("User: ", user);

  if (user === null) {
    res.status(204).send();
  } else {
    const token = jwt.sign(
      { value: user?.email },
      process.env.SESSION_TOKEN_SECRET!
    );
    // res.setHeader("Set-Cookie", token);
    res.cookie("mvx_jwt", token);
    console.log("Token: ", token);

    res.status(200).send(user);
  }
});

routerUser.post("/logout", (req: Request, res: Response) => {
  const token = jwt.sign(
    { value: "Expired" },
    process.env.SESSION_TOKEN_SECRET!
  );
  console.log("Logout Signed Token: ", token);
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
      //  console.log(newUser);
      res.status(201).send(newUser);
    });
  } else {
    res.status(205).send("Email already exist!");
  }
});

routerUser.post("/test", async (req: Request, res: Response) => {
  console.log(req.cookies);
  res.send("Received mon Mike");
});

function CheckJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SESSION_TOKEN_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log("Token verified");
    next();
  });
}
