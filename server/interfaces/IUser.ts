import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  googleID?: string;
}

export const userSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  googleID: { type: String },
});

export const User = model("User", userSchema);
