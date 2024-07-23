import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { controller } from '@config/controller/controller';
import { StatusError } from '@config/statusError/statusError';
import { ICreateUserRequest } from '@modules/users/model';
import { userService } from '@services/index';
import { envs } from '@config/env';

export const useSignUp = controller(async (req: Request, res: Response): Promise<void> => {
  const { body }: { body: ICreateUserRequest } = req;
  // get user details by email
  const userDetails = await userService.getUserDetailsByEmail(body.email);
  if (userDetails) {
    throw StatusError.badRequest('duplicateEmail');
  }

  body.password = await bcrypt.hash(body.password, envs.passwordSalt);

  const user = await userService.saveUser(body);

  res.send({ name: user.name, email: user.email });
});
