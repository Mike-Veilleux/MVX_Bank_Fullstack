export interface IUserCredential {
  fullName: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

// export interface ICreateAccountForm extends IUserCredential {
//   accountExist: string | undefined;
// }

export interface ILogin {
  email?: string | undefined;
  password?: string | undefined;
  accountExist?: string | undefined;
}

export enum ETransactionType {
  DEPOSIT = "Deposit",
  WITHDRAW = "Withdraw",
}

export interface ITransaction {
  sort: ETransactionType | undefined;
  amount: number | undefined;
  date: Date | undefined;
}

export interface IAccount {
  id: string | undefined;
  credentials: IUserCredential | undefined;
  balance: number | undefined;
  history: ITransaction[] | undefined;
}
