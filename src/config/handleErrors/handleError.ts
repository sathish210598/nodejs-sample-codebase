import { logger } from '@config/logger/logger';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  let message;
  let status;

  if (err.statusCode) {
    message = err.message || 'serverError';
    status = err.statusCode;
  } else {
    logger.error(JSON.stringify({ message: err.message, stack: err.stack }));
    message = 'serverError';
    status = 500;
  }

  res.locals.error = res.__(message);

  res.status(status).send({ error: res.__(message), timestamp: new Date().toISOString() });
};
