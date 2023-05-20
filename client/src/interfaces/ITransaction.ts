import { ETransactionType } from "./ENUMS";

export interface ITransaction {
  userName?: string | undefined;
  sort?: ETransactionType | undefined;
  amount?: number | undefined;
  date?: Date | undefined;
}

export function CreateTransaction(
  _userName: string | undefined,
  _sort: ETransactionType | undefined,
  _amount: number | undefined,
  _date: Date | undefined
) {
  const newTransaction: ITransaction = {
    userName: _userName,
    sort: _sort,
    amount: _amount,
    date: _date,
  };
  return newTransaction;
}
