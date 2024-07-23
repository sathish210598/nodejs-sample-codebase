import { Request } from 'express';
import { userService } from '@services/index';
import { middleware } from '@config/middleware/middleware';
import { StatusError } from '@config/statusError/statusError';
import { envs } from '@config/env';
/**
 * This function is used for validating X-API-KEY header
 * @param req
 * @param res
 * @param next
 */
export const validateUserAccessToken = middleware(async (req: Request): Promise<void> => {
  const token = req.token;
  if (!token) {
    throw StatusError.forbidden('');
  }

  const decodedData = await userService
    .verifyUserToken(token, envs.jwt.accessToken.secret)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((_err) => {
      throw StatusError.unauthorized('');
    });

  if (!decodedData) {
    throw StatusError.unauthorized('');
  }

  const userDetails = await userService.getUserDetailsById(decodedData.id);
  if (!userDetails) {
    throw StatusError.unauthorized('');
  }

  req['userDetails'] = userDetails;
});
