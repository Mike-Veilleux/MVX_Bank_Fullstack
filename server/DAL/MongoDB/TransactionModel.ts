import { Schema, model } from "mongoose";
import { ITransaction } from "../../interfaces/ITransaction";

export const transactionSchema = new Schema<ITransaction>({
  userName: { type: String },
  sort: { type: String },
  amount: { type: Number },
  date: { type: Date },
});

export const Transaction = model("Transaction", transactionSchema);
