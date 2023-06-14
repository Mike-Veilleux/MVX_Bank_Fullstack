import axios from "axios";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { IAccountType } from "../interfaces/ENUMS";
import { IAccount } from "../interfaces/IAccount";
import { ITransaction } from "../interfaces/ITransaction";

export type accountStore = {
  activeAccount: IAccount | undefined;
  allAccounts: IAccount[] | undefined;
  ACTIONS: {
    setActiveAccount: (_account: IAccount | undefined) => void;
  };
  API: {
    AddNewAccount: (_account: IAccount | undefined) => void;
    FetchAndSetActiveAccount: (
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
  activeAccount: undefined,
  allAccounts: [],
  ACTIONS: {
    setActiveAccount(_account) {
      set((state) => ({ activeAccount: _account }));
    },
  },
  API: {
    AddNewAccount: async (_account) => {
      let data: IAccount | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/account/addNew`,
        withCredentials: true,
        data: {
          account: _account,
        },
      });
      data = response.data;
      set((state) => ({ activeAccount: data }));
    },
    FetchAndSetActiveAccount: async (_ownersID, _accountType) => {
      let data: IAccount | null | undefined;
      const response = await axios({
        method: "POST",
        url: `${
          import.meta.env.VITE_API_BASE_URL
        }/account/getBy-ownerId-and-type`,
        withCredentials: true,
        data: {
          ownersID: _ownersID,
          accountType: _accountType,
        },
      });

      data = response.data;

      if (data !== null) {
        set((state) => ({ activeAccount: data }));
        return data!;
      } else {
        return null;
      }
    },
    UpdateBalance: async (_ownersID, _amount) => {
      let data: IAccount | null;
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_BASE_URL}/account/update-balance`,
        withCredentials: true,
        data: {
          ownersID: _ownersID,
          accountType: get().activeAccount?.accountType,
          amount: _amount,
        },
      });
      data = response.data;
      if (data !== null) {
        set((state) => ({ activeAccount: data }));
        return data!;
      } else {
        return null;
      }
    },
    AddTransactionToAccount: async (_accountID, _newTransaction) => {
      let data: IAccount | undefined;
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_BASE_URL}/account/add-transaction`,
        withCredentials: true,
        data: {
          accountID: _accountID,
          newTransaction: _newTransaction,
        },
      });
      data = response.data;
      if (data !== null) {
        set((state) => ({ activeAccount: data }));
        return data!;
      } else {
        return null;
      }
    },
  },
}));

export const useAccount = () => useAccountStore((state) => state.activeAccount);
export const useAccount_ACTIONS = () =>
  useAccountStore((state) => state.ACTIONS);

export const useAccount_API = () => useAccountStore((state) => state.API);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Accounts", useAccountStore);
}
