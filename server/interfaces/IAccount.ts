import { Schema, model } from "mongoose";
import { ITransaction, transactionSchema } from "./ITransaction";

export interface IAccount {
  _id?: string | undefined;
  ownersID?: string[] | undefined;
  accountType?: string | undefined;
  balance?: number | undefined;
  history?: ITransaction[] | undefined;
}

export const accountSchema = new Schema<IAccount>({
  ownersID: [{ type: String }],
  accountType: { type: String },
  balance: { type: Number },
  history: [transactionSchema],
});

export const Account = model("Account", accountSchema);
