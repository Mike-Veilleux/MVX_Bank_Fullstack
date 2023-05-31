export interface IUser {
  _id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  googleID?: string | undefined;
}

export function CreateUser(
  _name: string | undefined,
  _email: string | undefined,
  _password: string | undefined,
  _googleID: string | undefined
) {
  const newUser: IUser = {
    name: _name,
    email: _email,
    password: _password,
    googleID: _googleID,
  };
  return newUser;
}
