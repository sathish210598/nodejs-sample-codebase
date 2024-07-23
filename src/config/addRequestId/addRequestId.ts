import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

export const addRequestId = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.get('request-id')) {
    const id = uuid().split('-')[0];
    req.headers['request-id'] = id;
  }
  next();
};
