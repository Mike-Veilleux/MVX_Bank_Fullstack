import axios from "axios";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { IAccountType } from "../interfaces/ENUMS";
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
    FetchUserByEmail: (_userEmail: string) => Promise<IUser>;
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
        const newAccount = CreateNewAccount(IAccountType.SAVINGS, data?._id!);
        account_API.AddNewAccount(newAccount);
        account_API.FetchAccount(data!._id!, IAccountType.SAVINGS);
        set((state) => ({ user: data }));
        return true;
      } else {
        return false;
      }
    },
    FetchUserByEmail: async (_userEmail) => {
      let data: IUser | undefined;
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/user/get-by-email`,
        // withCredentials: true,
        data: {
          email: _userEmail,
        },
      });
      data = response.data[0];
      if (response.status == 200) {
        // const acc = await useAccountStore
        //   .getState()
        //   .API.FetchAccount(data!._id!, IAccountType.SAVINGS);

        // set((state) => ({ user: data! }));
        return data!;
      } else {
        return {};
      }
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
        account_API.FetchAccount(data!._id!, IAccountType.SAVINGS);
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
