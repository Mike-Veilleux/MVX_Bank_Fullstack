import { IAccountType } from "./ENUMS";
import { ITransaction } from "./ITransaction";

export interface IAccount {
  _id?: string | undefined;
  ownersID?: string[] | undefined;
  accountType?: IAccountType | undefined;
  balance?: number | undefined;
  history?: ITransaction[] | undefined;
}

export function CreateNewAccount(_accountType: IAccountType, _ownerID: string) {
  const newAcc: IAccount = {
    ownersID: [_ownerID],
    accountType: _accountType,
    balance: 0,
    history: [],
  };
  return newAcc;
}
