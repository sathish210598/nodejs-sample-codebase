import { Router } from 'express';
import { authRouter } from './auth';
import { userRouter } from './user';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/user', userRouter);
// All routes go here

export { v1Router };
