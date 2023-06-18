import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUser } from "../../interfaces/IUser";

export const userSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  googleID: { type: String },
});

userSchema.pre("save", async function (next) {
  if (this.password !== "") {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password!, salt);
  }
  if (this.googleID !== "") {
    const salt = await bcrypt.genSalt();
    this.googleID = await bcrypt.hash(this.googleID!, salt);
  }
  next();
});

export const User = model("User", userSchema);
