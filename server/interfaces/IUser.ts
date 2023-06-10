import bcrypt from "bcrypt";
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

userSchema.pre("save", async function (next) {
  if (this.googleID === "") {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password!, salt);
  }
  next();
});

export const User = model("User", userSchema);
