import jwt from 'jsonwebtoken';
import { IUser, IUserTokens } from '@modules/users/model';
import { envs } from '@config/env';

export const generateUserTokens = (userDetails: IUser): IUserTokens => {
  const accessTokenExpiry = envs.jwt.accessToken.expiry;
  const refreshTokenExpiry = envs.jwt.refreshToken.expiry;
  const accessToken = jwt.sign(
    { id: userDetails._id, name: userDetails.name, email: userDetails.email },
    envs.jwt.accessToken.secret,
    { expiresIn: accessTokenExpiry },
  );
  const refreshToken = jwt.sign(
    { id: userDetails._id, name: userDetails.name, email: userDetails.email },
    envs.jwt.refreshToken.secret,
    { expiresIn: refreshTokenExpiry },
  );
  return {
    accessToken: accessToken,
    accessTokenExpiry: accessTokenExpiry,
    refreshToken: refreshToken,
    refreshTokenExpiry: refreshTokenExpiry,
    name: userDetails.name,
    email: userDetails.email,
  };
};
