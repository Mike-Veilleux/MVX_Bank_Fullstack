import { ITransaction } from "./ITransaction";

export interface IAccount {
  _id?: string | undefined;
  ownersID?: string[] | undefined;
  accountType?: string | undefined;
  balance?: number | undefined;
  history?: ITransaction[] | undefined;
}
