/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
  interface Response {
    __: any;
  }
  interface Request {
    token: string | null;
    userDetails: IUserRequestObject | null;
  }
}
