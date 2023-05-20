import express, { Request, Response } from "express";
import { IUser, User } from "../interfaces/IUser";

export const routerUser = express.Router();

routerUser.post("/get-by-email", async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await User.find({ email: email });

  if (user === null) {
    res.status(204);
  } else {
    console.log(user);
    res.status(200).send(user);
  }
});

routerUser.post("/login", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email, password: password });

  if (user === null) {
    res.status(204);
  } else {
    console.log(user);
    res.status(200).send(user);
  }
});

routerUser.post("/new", async (req: Request, res: Response) => {
  const newUser: IUser = req.body.user;
  const matchingUser = await User.findOne({ email: newUser.email });
  if (!matchingUser) {
    const result = new User(newUser);
    result.save((err, newUser) => {
      if (err) return console.log(err);
      console.log(newUser);
      res.status(201).send(newUser);
    });
  } else {
    res.status(205).send("Email already exist!");
  }
});
