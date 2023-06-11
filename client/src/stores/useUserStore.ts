import axios from "axios";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { IAccountType, IUserType } from "../interfaces/ENUMS";
import { CreateNewAccount } from "../interfaces/IAccount";
import { IUser } from "../interfaces/IUser";
import { useAccountStore } from "./useAccountsStore";

export type userStore = {
  user: IUser | undefined;
  newUser: IUser | undefined;
  ACTIONS: {
    setActiveUser: (_user: IUser | undefined) => void;
    setNewUser: (_user: IUser | undefined) => void;
  };
  API: {
    CreateNewUser: (_newUser: IUser) => Promise<boolean>;
    AuthenticateLocalUser: (
      _email: string,
      _password: string
    ) => Promise<boolean>;
    AuthenticateGoogleUser: (
      _email: string,
      _googleID: string
    ) => Promise<boolean>;
    CheckExistingUser: (_userEmail: string) => Promise<IUserType | null>;
    SubmitLogin: (
      _userEmail: string,
      _userPassword: string
    ) => Promise<boolean>;
    MailMessage: (_recipient: string, _message: string) => void;
  };
};

export const useUserStore = create<userStore>((set, get) => ({
  user: undefined,
  newUser: undefined,
  ACTIONS: {
    setActiveUser(_user) {
      set((state) => ({ user: _user }));
    },
    setNewUser(_user) {
      set((state) => ({ newUser: _user }));
    },
  },
  API: {
    CreateNewUser: async (_newUser) => {
      let data: IUser | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/new`,
        // withCredentials: true,
        data: {
          user: _newUser,
        },
      });
      data = response.data;
      // 201 = HTTP statuscode: Resource created
      if (response.status == 201) {
        const account_API = useAccountStore.getState().API;
        const newSavingAccount = CreateNewAccount(
          IAccountType.SAVINGS,
          data?._id!
        );
        const newCheckAccount = CreateNewAccount(
          IAccountType.CHECK,
          data?._id!
        );
        account_API.AddNewAccount(newSavingAccount);
        account_API.AddNewAccount(newCheckAccount);
        account_API.FetchAndSetActiveAccount(data!._id!, IAccountType.SAVINGS);
        set((state) => ({ user: data }));
        return true;
      } else {
        return false;
      }
    },
    AuthenticateLocalUser: async (_email, _password) => {
      let data: IUser | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/auth-local`,
        withCredentials: true,
        data: {
          email: _email,
          password: _password,
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

    AuthenticateGoogleUser: async (_email, _googleID) => {
      let data: IUser | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/auth-google`,
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
    CheckExistingUser: async (_userEmail) => {
      let data: IUserType | null;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/type`,
        withCredentials: true,
        data: {
          email: _userEmail,
        },
      });
      data = response.data;
      return data;
    },
    SubmitLogin: async (_userEmail, _userPassword) => {
      let data: IUser | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        // withCredentials: true,
        data: {
          email: _userEmail,
          password: _userPassword,
        },
      });
      data = response.data;
      console.log(response.headers.coo);
      if (response.status == 200) {
        const account_API = useAccountStore.getState().API;
        account_API.FetchAndSetActiveAccount(data!._id!, IAccountType.SAVINGS);
        set((state) => ({ user: data }));
        return true;
      } else {
        return false;
      }
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
export const useNewUser = () => useUserStore((state) => state.newUser);
export const useUser_ACTIONS = () => useUserStore((state) => state.ACTIONS);
export const useUser_API = () => useUserStore((state) => state.API);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("USER", useUserStore);
}
