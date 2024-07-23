import 'module-alias/register';
import app from './app';
import { logger } from '@config/logger/logger';
import '@config/env/validateEnv';
import { envs } from '@config/env';

app.listen(envs.port, () => {
  logger.info(`Express server listening on port ${envs.port}`);
});
