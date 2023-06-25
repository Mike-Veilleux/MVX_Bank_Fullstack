import axios from "axios";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { IAccountType, IUserType } from "../interfaces/ENUMS";
import { CreateNewAccount } from "../interfaces/IAccount";
import { IUser } from "../interfaces/IUser";
import { useAccountStore } from "./useAccountsStore";

export type userStore = {
  user: IUser | undefined;
  newUserFormData: IUser | undefined;
  ACTIONS: {
    setActiveUser: (_user: IUser | undefined) => void;
    setNewUser: (_user: IUser | undefined) => void;
  };
  API: {
    CreateNewUser: (_newUser: IUser) => Promise<boolean>;
    LoginLocalUser: (_email: string, _password: string) => Promise<boolean>;
    LoginGoogleUser: (_email: string, _googleID: string) => Promise<boolean>;
    LoginUserType: (_email: string) => Promise<IUserType | null>;
    MailMessage: (_recipient: string, _message: string) => void;
  };
};

export const useUserStore = create<userStore>((set, get) => ({
  user: undefined,
  newUserFormData: undefined,
  ACTIONS: {
    setActiveUser(_user) {
      set((state) => ({ user: _user }));
    },
    setNewUser(_user) {
      set((state) => ({ newUserFormData: _user }));
    },
  },
  API: {
    CreateNewUser: async (_newUser) => {
      let data: IUser | boolean;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/new`,
        data: {
          newUser: _newUser,
        },
      });
      data = response.data;
      if (data !== false && typeof data !== "boolean") {
        const account_API = useAccountStore.getState().API;
        const newSavingAccount = CreateNewAccount(
          IAccountType.SAVINGS,
          data?._id!
        );
        const newCheckAccount = CreateNewAccount(
          IAccountType.CHECK,
          data?._id!
        );
        account_API.CreateNewAccount(newSavingAccount);
        account_API.CreateNewAccount(newCheckAccount);
        account_API.FetchAndSetActiveAccount(data!._id!, IAccountType.SAVINGS);
        set((state) => ({ user: data as IUser }));
        return true;
      } else {
        return false;
      }
    },
    LoginLocalUser: async (_email, _password) => {
      let data: IUser | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/login-local`,
        // withCredentials: true,
        data: {
          email: _email,
          password: _password,
        },
      });
      data = response.data;
      if (data.email !== "") {
        // show no user found toast
        return false;
      } else {
        const account_API = useAccountStore.getState().API;
        account_API.FetchAndSetActiveAccount(data!._id!, IAccountType.SAVINGS);
        set((state) => ({ user: data }));
        return true;
      }
    },
    LoginGoogleUser: async (_email, _googleID) => {
      let data: IUser | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/login-google`,
        withCredentials: true,
        data: {
          email: _email,
          googleID: _googleID,
        },
      });
      if (response.status === 204) {
        // show no user found toast
        return false;
      } else {
        data = response.data;
        const account_API = useAccountStore.getState().API;
        account_API.FetchAndSetActiveAccount(data!._id!, IAccountType.SAVINGS);
        set((state) => ({ user: data }));
        return true;
      }
    },
    LoginUserType: async (_email) => {
      let data: IUserType | null;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/login-type`,
        withCredentials: true,
        data: {
          email: _email,
        },
      });
      data = response.data;
      return data;
    },
    MailMessage: async (_recipient, _message) => {
      axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/notification/sendMail`,
        // withCredentials: true,
        data: {
          recipient_email: _recipient,
          message: _message,
        },
      });
    },
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useNewUserFormData = () =>
  useUserStore((state) => state.newUserFormData);
export const useUser_ACTIONS = () => useUserStore((state) => state.ACTIONS);
export const useUser_API = () => useUserStore((state) => state.API);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("USER", useUserStore);
}
