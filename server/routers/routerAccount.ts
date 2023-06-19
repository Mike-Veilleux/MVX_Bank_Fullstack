import express, { Request, Response } from "express";
import {
  Account_AddTransaction,
  Account_CreateNew,
  Account_GetByOwnerIdAndType,
  Account_UpdateBalance,
} from "../DAL/MongoDB/DAL";
import { IAccount } from "../interfaces/IAccount";

export const routerAccount = express.Router();

routerAccount.post("/new", async (req: Request, res: Response) => {
  const newAccount: IAccount | null = await Account_CreateNew(req.body.account);
  res.send(newAccount);
});

routerAccount.post(
  "/getBy-ownerId-and-type",
  async (req: Request, res: Response) => {
    const account: IAccount | null = await Account_GetByOwnerIdAndType(
      req.body.ownersID,
      req.body.accountType
    );
    res.send(account);
  }
);

routerAccount.patch("/update-balance", async (req: Request, res: Response) => {
  const updatedAccount: IAccount | null = await Account_UpdateBalance(
    req.body.ownersID,
    req.body.accountType,
    parseInt(req.body.amount)
  );
  res.send(updatedAccount);
});

routerAccount.patch("/add-transaction", async (req: Request, res: Response) => {
  const updatedAccount: IAccount | null = await Account_AddTransaction(
    req.body.accountID,
    req.body.newTransaction
  );
  res.send(updatedAccount);
});
