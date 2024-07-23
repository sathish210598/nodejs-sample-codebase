import { Request, Response } from 'express';
import { controller } from '@config/controller/controller';
import { IUserRequestObject } from '@modules/users/model';

/**
 * This function is used to get logged in user details
 * @param req
 * @param res
 */
export const getCurrentUser = controller(async (req: Request, res: Response): Promise<void> => {
  const { userDetails }: { userDetails: IUserRequestObject } = req;
  res.status(200).send(userDetails);
});
