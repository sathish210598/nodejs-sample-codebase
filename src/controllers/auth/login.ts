import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { controller } from '@config/controller/controller';
import { StatusError } from '@config/statusError/statusError';
import { ILoginUserRequest } from '@modules/users/model';
import { userService } from '@services/index';

export const useLogin = controller(async (req: Request, res: Response): Promise<void> => {
  const reqBody: ILoginUserRequest = req.body;
  // get user details by email
  const userDetails = await userService.getUserDetailsByEmail(reqBody.email);
  if (!userDetails) {
    throw StatusError.badRequest('invalidEmailOrPassword');
  }

  // password compare process
  const isSame = await bcrypt.compare(reqBody.password, userDetails.password);
  if (!isSame) {
    throw StatusError.badRequest('invalidEmailOrPassword');
  }

  res.send(userService.generateUserTokens(userDetails));
});
