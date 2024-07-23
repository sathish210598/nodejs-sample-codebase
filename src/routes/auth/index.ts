import { Router } from 'express';
import { authController } from '@controllers/index';
import { validateUserRefreshToken } from '@middleware/index';

import { userLogin, userSignup } from '@validations/user';

const authRouter = Router();

authRouter.post('/', userSignup, authController.useSignUp);

authRouter.post('/login', userLogin, authController.useLogin);

authRouter.get('/token', validateUserRefreshToken, authController.generateNewToken);

export { authRouter };
