import { Request, Response } from 'express';
import { controller } from '@config/controller/controller';
import { userService } from '@services/index';

/**
 * This function is used to generate new refresh token
 * @param req
 * @param res
 */
export const generateNewToken = controller(async (req: Request, res: Response): Promise<void> => {
  res.send(userService.generateUserTokens(req.userDetails));
});
