import express, { Request, Response } from "express";
import { IUser, User } from "../interfaces/IUser";

export const routerUser = express.Router();

routerUser.post("/get-by-email", async (req: Request, res: Response) => {
  const email = req.body.email;
  const user: IUser | null = await User.findOne({ email: email });

  if (user === null) {
    res.status(204);
  } else {
    res.send(user);
  }
});

routerUser.post("/new", async (req: Request, res: Response) => {
  const newUser: IUser = req.body.user;
  if (newUser) {
    const result = new User(newUser);
    result.save((err, newUser) => {
      if (err) return console.log(err);
      res.send({ _id: newUser._id });
    });
  } else {
    res.send("Request Failed!");
  }
});
