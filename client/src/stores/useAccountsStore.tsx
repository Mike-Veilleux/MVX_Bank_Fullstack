import axios from "axios";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { IAccountType } from "../interfaces/ENUMS";
import { IAccount } from "../interfaces/IAccount";
import { ITransaction } from "../interfaces/ITransaction";

export type accountStore = {
  account: IAccount | undefined;
  ACTIONS: {
    //addAccount: (_newAccount: IAccount) => void;
    updateAccounts: (_newAccountData: IAccount) => void;
    //loadAccountsFromLocalStorage: () => void;
    setActiveAccount: (_account: IAccount | undefined) => void;
  };
  API: {
    AddNewAccount: (_account: IAccount | undefined) => void;
    FetchAccount: (
      _userID: string,
      _AccountType: IAccountType
    ) => Promise<IAccount>;
    UpdateBalance: (_id: string, _amount: number) => Promise<IAccount>;
    AddTransactionToAccount: (
      _accountID: string,
      _newTransaction: ITransaction
    ) => Promise<IAccount>;
  };
};

export const useAccountStore = create<accountStore>((set, get) => ({
  account: undefined,
  ACTIONS: {
    // addAccount(_newAccount: IAccount) {
    //   const existingAccounts = get().users!;
    //   let newAccounts: IAccount[];
    //   if (existingAccounts === null) {
    //     newAccounts = [_newAccount];
    //   } else {
    //     newAccounts = [...existingAccounts, _newAccount];
    //   }
    //   localStorage.setItem(storageKey, JSON.stringify(newAccounts));
    //   set((state) => ({ users: newAccounts }));
    // },

    setActiveAccount(_account) {
      set((state) => ({ account: _account }));
    },
    updateAccounts(_newAccountData) {
      // const xAccounts = get().users;
      // const indexAccount = xAccounts?.findIndex(
      //   (account) => account._id === _newAccountData._id
      // );
      // if (indexAccount! >= 0) {
      //   xAccounts?.splice(indexAccount!, 1, _newAccountData);
      //   localStorage.setItem(storageKey, JSON.stringify(xAccounts));
      //   set((state) => ({ users: xAccounts }));
      // }
    },
  },
  API: {
    AddNewAccount: async (_account) => {
      let data: IAccount | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/account/new`,
        // withCredentials: true,
        data: {
          account: _account,
        },
      });
      data = response.data;
      set((state) => ({ account: data }));
    },
    FetchAccount: async (_userID, _accountType) => {
      let data: IAccount | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/account/get-by-id`,
        // withCredentials: true,
        data: {
          id: _userID,
          accountType: _accountType,
        },
      });
      data = response.data;
      set((state) => ({ account: data }));
      return data;
    },
    UpdateBalance: async (_id, _amount) => {
      let data: IAccount | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/account/update-balance`,
        // withCredentials: true,
        data: {
          id: _id,
          amount: _amount,
        },
      });
      data = response.data;
      set((state) => ({ account: data }));
      return data!;
    },
    AddTransactionToAccount: async (_accountID, _newTransaction) => {
      let data: IAccount | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/account/add-transaction`,
        // withCredentials: true,
        data: {
          id: _accountID,
          newTransaction: _newTransaction,
        },
      });
      data = response.data;
      set((state) => ({ account: data }));
      return data!;
    },
  },
}));

export const useAccount = () => useAccountStore((state) => state.account);
export const useAccount_ACTIONS = () =>
  useAccountStore((state) => state.ACTIONS);

export const useAccount_API = () => useAccountStore((state) => state.API);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Accounts", useAccountStore);
}
