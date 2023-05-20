import { Schema, model } from "mongoose";

export interface ITransaction {
  userName?: string | undefined;
  sort?: string | undefined;
  amount?: number | undefined;
  date?: Date | undefined;
}

export const transactionSchema = new Schema<ITransaction>({
  userName: { type: String },
  sort: { type: String },
  amount: { type: Number },
  date: { type: Date },
});

export const Transaction = model("Transaction", transactionSchema);
