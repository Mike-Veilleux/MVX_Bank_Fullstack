import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { IAccount } from "../interfaces/interfaces";

export type accountStore = {
  accounts: IAccount[] | undefined;
  activeAccountID: string | undefined;
  actions: {
    addAccount: (_newAccount: IAccount) => void;
    updateAccounts: (_newAccountData: IAccount) => void;
    loadAccountsFromLocalStorage: () => void;
    setActiveAccount: (_ID: string | undefined) => void;
  };
};
const storageKey = "BadBank";
const useAccountStore = create<accountStore>((set, get) => ({
  accounts: [],
  activeAccountID: undefined,
  actions: {
    addAccount(_newAccount: IAccount) {
      const existingAccounts = get().accounts!;
      let newAccounts: IAccount[];
      if (existingAccounts === null) {
        newAccounts = [_newAccount];
      } else {
        newAccounts = [...existingAccounts, _newAccount];
      }
      localStorage.setItem(storageKey, JSON.stringify(newAccounts));
      set((state) => ({ accounts: newAccounts }));
    },
    setActiveAccount(_ID) {
      set((state) => ({ activeAccountID: _ID }));
    },
    updateAccounts(_newAccountData) {
      const xAccounts = get().accounts;
      const indexAccount = xAccounts?.findIndex(
        (account) => account.id === _newAccountData.id
      );
      if (indexAccount! >= 0) {
        xAccounts?.splice(indexAccount!, 1, _newAccountData);
        localStorage.setItem(storageKey, JSON.stringify(xAccounts));
        set((state) => ({ accounts: xAccounts }));
      }
    },
    loadAccountsFromLocalStorage() {
      const storedAccount = JSON.parse(localStorage.getItem(storageKey)!);
      set((state) => ({ accounts: storedAccount }));
    },
  },
}));

export const useStoreAccounts = () =>
  useAccountStore((state) => state.accounts);
export const useStoreActiveAccountID = () =>
  useAccountStore((state) => state.activeAccountID);
export const useStoreActions = () => useAccountStore((state) => state.actions);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Accounts", useAccountStore);
}
