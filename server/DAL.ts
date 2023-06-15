import dotenv from "dotenv";
import mongoose from "mongoose";
import { IUserType } from "./interfaces/ENUMs";
import { Account, IAccount } from "./interfaces/IAccount";
import { ITransaction } from "./interfaces/ITransaction";
import { IUser, User } from "./interfaces/IUser";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION_STRING!);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(`Connected to MongoDB`));

export async function Account_CreateNew(_account: IAccount) {
  const dbModel = new Account(_account);
  let newAccount: IAccount | null = await dbModel.save();
  return newAccount;
}

export async function Account_GetByOwnerIdAndType(
  _ownersID: string,
  _accountType: string
) {
  const account: IAccount | null = await Account.findOne({
    ownersID: _ownersID,
    accountType: _accountType,
  });
  return account;
}

export async function Account_UpdateBalance(
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

export async function Account_AddTransaction(
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
  if (matchingUser === null) {
    const dbModel = new User(_newUser);
    const newUser: IUser | null = await dbModel.save();
    return newUser;
  } else {
    return null;
  }
}

export async function User_GetUserLoginType(_email: string) {
  const user: IUser | null = await User.findOne({ email: _email });
  let loginType: IUserType | null = null;
  if (user === null) {
    loginType = IUserType.NONE;
  } else if (user.password !== "") {
    loginType = IUserType.LOCAL;
  } else if (user.googleID !== "") {
    loginType = IUserType.GOOGLE;
  }

  console.log(loginType);
  return loginType;
}

export async function User_GetGoogleCredentials(
  _email: string,
  _googleID: string
) {
  const googleCredential: IUser | null = await User.findOne({
    email: _email,
    googleID: _googleID,
  });
  console.log(googleCredential);
  return googleCredential;
}

export async function User_GetLocalCredentials(_email: string) {
  const localCredential: IUser | null = await User.findOne({
    email: _email,
  });
  return localCredential;
}
