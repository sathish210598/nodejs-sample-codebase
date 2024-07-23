import morgan from 'morgan';
import split2 from 'split2';
import { createLogger, format, transports, Logger } from 'winston';
import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logger: Logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
  exitOnError: false,
});

morgan.token('content', (req: Request, res: Response) => {
  if (!res.statusCode) {
    return '-';
  }
  if (res.statusCode < 400) {
    return res.get('content-length');
  }

  return res.locals.error || '-';
});

const morganFormat = 'HTTP :req[request-id] :method :url :status :content - :response-time ms';
const stream = split2().on('data', (line: string) => logger.info(line));

logger.stream(stream);
const morganConf = morgan(morganFormat, { stream });

export { logger, morganConf };
