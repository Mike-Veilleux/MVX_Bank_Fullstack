import express, { Request, Response } from "express";
import {
  AddNewAccount,
  AddTransactionToAccount,
  GetAccountByOwnerIdAndType,
  UpdateAccountBalance,
} from "../DAL";
import { IAccount } from "../interfaces/IAccount";

export const routerAccount = express.Router();

routerAccount.post("/add-new", async (req: Request, res: Response) => {
  const newAccount: IAccount | null = await AddNewAccount(req.body.account);
  res.send(newAccount);
});

routerAccount.post(
  "/getBy-ownerId-and-type",
  async (req: Request, res: Response) => {
    const account: IAccount | null = await GetAccountByOwnerIdAndType(
      req.body.ownersID,
      req.body.accountType
    );
    res.send(account);
  }
);

routerAccount.patch("/update-balance", async (req: Request, res: Response) => {
  const updatedAccount: IAccount | null = await UpdateAccountBalance(
    req.body.ownersID,
    req.body.accountType,
    parseInt(req.body.amount)
  );
  res.send(updatedAccount);
});

routerAccount.patch("/add-transaction", async (req: Request, res: Response) => {
  const updatedAccount: IAccount | null = await AddTransactionToAccount(
    req.body.accountID,
    req.body.newTransaction
  );
  res.send(updatedAccount);
});
