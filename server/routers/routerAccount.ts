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

  if (account === null || account === undefined) {
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
  const accountType = req.body.accountType;
  const amount = parseInt(req.body.amount);

  const account = await Account.findOneAndUpdate(
    {
      ownersID: id,
      accountType: accountType,
    },
    { $inc: { balance: amount } },
    { new: true }
  ).exec();

  if (account === null || account === undefined) {
    res.status(204);
  } else {
    res.send(account);
  }
});

routerAccount.post("/add-transaction", async (req: Request, res: Response) => {
  const id = req.body.id;
  const transaction = req.body.newTransaction;

  const account = await Account.findByIdAndUpdate(
    id,
    { $push: { history: { $each: [transaction] } } },
    { new: true }
  ).exec();

  if (account === null || account === undefined) {
    res.status(204);
  } else {
    res.send(account);
  }
});
