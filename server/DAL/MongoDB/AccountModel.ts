import { Schema, model } from "mongoose";
import { IAccount } from "../../interfaces/IAccount";
import { transactionSchema } from "./TransactionModel";

export const accountSchema = new Schema<IAccount>({
  ownersID: [{ type: String }],
  accountType: { type: String },
  balance: { type: Number },
  history: [transactionSchema],
});

export const Account = model("Account", accountSchema);
