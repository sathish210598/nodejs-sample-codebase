import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyUserToken = (token: string, tokenSecret: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, (err, decodeData) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodeData);
      }
    });
  });
};
