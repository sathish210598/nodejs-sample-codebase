import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: IUserName;
  email: string;
  password: string;
}

interface IUserName {
  first: string;
  last: string;
}

export interface ICreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface IUserTokens {
  name: IUserName;
  email: string;
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  refreshTokenExpiry: number;
}

export interface IUserRequestObject {
  name: IUserName;
  email: string;
  _id: Types.ObjectId;
}
