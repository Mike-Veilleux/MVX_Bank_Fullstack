import express, { Request, Response } from "express";
import { Account, IAccount } from "../interfaces/IAccount";

export const routerAccount = express.Router();

routerAccount.post("/get-by-id", async (req: Request, res: Response) => {
  const id = req.body.id;
  const accountType = req.body.accountType;

  const account: IAccount | null = await Account.findOne({
    ownersID: id,
    accountType: accountType,
  });
  console.log("Fetch about to return: ", account);
  if (account === null) {
    res.status(204);
  } else {
    res.send(account);
  }
});

routerAccount.post("/new", async (req: Request, res: Response) => {
  const newAccount: IAccount = req.body.account;
  if (newAccount) {
    const result = new Account(newAccount);
    result.save((err, nAcc) => {
      if (err) return console.log(err);
      res.status(201).send(nAcc);
    });
  } else {
    res.status(404).send("Request Failed!");
  }
});

routerAccount.post("/update-balance", async (req: Request, res: Response) => {
  const id = req.body.id;
  const amount = parseInt(req.body.amount);

  console.log("User ID is : ", id);
  console.log("typeof amount is: ", typeof amount, " --- Value :", amount);
  const account = await Account.findOneAndUpdate(
    {
      ownersID: id,
    },
    { $inc: { balance: amount } },
    { new: true }
  ).exec();

  console.log("UpdateBalance about to return: ", account);
  if (account === null || account === undefined) {
    res.status(204);
  } else {
    res.send(account);
  }
});

routerAccount.post("/add-transaction", async (req: Request, res: Response) => {
  const id = req.body.id;
  const transaction = req.body.newTransaction;

  console.log("User ID is : ", id);

  const account = await Account.findByIdAndUpdate(
    id,
    { $push: { history: { $each: [transaction] } } },
    { new: true }
  ).exec();

  console.log("Update transaction about to return: ", account);
  if (account === null || account === undefined) {
    res.status(204);
  } else {
    res.send(account);
  }
});

// routerAccount.get("/all", async (req: Request, res: Response) => {
//   const user = await User.find();

//   if (user === null) {
//     res.status(204);
//   } else {
//     console.log(user);
//     res.status(200).send(user);
//   }
// });
