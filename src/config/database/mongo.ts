import { logger } from '@config/logger/logger';
import mongoose from 'mongoose';
import { envs } from '@config/env';
/**
 * This function is used for connecting database
 */
export const connect = (): void => {
  mongoose.connect(envs.db.connectionURL, envs.db.option, function (err) {
    if (err) {
      logger.error('Mongo DB Connection Error', err);
    } else {
      logger.info('Mongo DB Connected');
    }
  });
};
