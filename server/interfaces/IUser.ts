import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  passwordHash?: string;
}

export const userSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String },
  passwordHash: { type: String },
});

export const User = model("User", userSchema);
