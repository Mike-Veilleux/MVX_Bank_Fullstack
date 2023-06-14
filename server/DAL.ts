import dotenv from "dotenv";
import mongoose from "mongoose";
import { Account, IAccount } from "./interfaces/IAccount";
import { ITransaction } from "./interfaces/ITransaction";
import { IUser, User } from "./interfaces/IUser";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION_STRING!);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(`Connected to MongoDB`));

export async function AddNewAccount(_account: IAccount) {
  const dbModel = new Account(_account);
  let newAccount: IAccount | null = null;
  dbModel.save((err, nAcc) => {
    if (err) return console.log(err);
    newAccount = nAcc;
  });
  return newAccount;
}

export async function GetAccountByOwnerIdAndType(
  _ownersID: string,
  _accountType: string
) {
  const account: IAccount | null = await Account.findOne({
    ownersID: _ownersID,
    accountType: _accountType,
  });
  return account;
}

export async function UpdateAccountBalance(
  _ownersID: string,
  _accountType: string,
  _amount: number
) {
  const updatedAccount: IAccount | null = await Account.findOneAndUpdate(
    {
      ownersID: _ownersID,
      accountType: _accountType,
    },
    { $inc: { balance: _amount } },
    { new: true }
  ).exec();
  return updatedAccount;
}

export async function AddTransactionToAccount(
  _accountID: string,
  _transaction: ITransaction
) {
  const updatedAccount: IAccount | null = await Account.findByIdAndUpdate(
    _accountID,
    { $push: { history: { $each: [_transaction] } } },
    { new: true }
  ).exec();
  return updatedAccount;
}

export async function User_CreateNew(_newUser: IUser) {
  const matchingUser: IUser | null | undefined = await User.findOne({
    email: _newUser.email,
  });
  let newUser: IUser | null = null;
  if (!matchingUser) {
    const dbModel = new User(_newUser);
    dbModel.save((err, nUser) => {
      if (err) return console.log(err);
      newUser = nUser;
    });
  } else {
    newUser = null;
  }
  return newUser;
}
