import { IUser } from "features/users/types";

export type IAuth = Pick<IUser, 'email' | 'password'>

export type UserResponse = {
  token: string;
};
