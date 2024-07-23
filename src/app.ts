import express, { Application, NextFunction, Request, Response } from 'express';
import bearerToken from 'express-bearer-token';
import { resolve } from 'path';
import cors from 'cors';
import { connect as mongoConnect } from '@config/database/mongo';
import { v1Router } from './routes';
import * as i18n from 'i18n';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '@assets/swagger/swagger.json';
import { handleError } from '@config/handleErrors/handleError';
import { errors } from 'celebrate';
import { morganConf } from '@config/logger/logger';
import { addRequestId } from '@config/addRequestId/addRequestId';
import { StatusError } from '@config/statusError/statusError';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeSwagger();
    this.initializeI18n();
    this.setHeaders();
    this.initializeMiddleware();
    this.initializeDBConnection();
    this.initializeRoutes();
    this.overrideExpressResponse();
  }

  /**
   * Initialization of internationalization(i18n)
   * default language english.
   */
  private initializeI18n(): void {
    i18n.configure({
      locales: ['en'],
      directory: resolve(__dirname, './assets/locales'),
    });
    this.app.use(i18n.init);
  }

  /**
   * Initialization of API's documentation.
   * We used Swagger 3.
   */
  private initializeSwagger(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  /**
   * All express middleware goes here
   * `body-parser` = parsing request body
   * `bearerToken` = For `Basic Auth` token
   */
  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(addRequestId);
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(bearerToken());
    this.app.use(morganConf);
  }

  /**
   * Handling database connection
   * In this application we are using only MongoDB with helper lib `mongoose`
   */
  private initializeDBConnection(): void {
    mongoConnect();
  }

  /**
   * Basic header configuration
   * It is recommended to update this section, depending on application's needs.
   * Security Attention: Take a special care of `Allow-Origin` for production
   */
  private setHeaders(): void {
    this.app.use(cors());
  }

  /**
   * Overriding the express response.
   */
  private overrideExpressResponse(): void {
    this.app.use(errors());
    this.app.use(handleError);
  }

  /**
   * Initializing APIs base routes.
   * APIs base path also depends on server proxy configuration.
   */
  private initializeRoutes() {
    this.app.get('healthz', (req: Request, res: Response) =>
      res.status(200).send({ message: 'ok' }),
    );

    this.app.use('/api/v1', v1Router);

    this.app.use((req: Request, res: Response, next: NextFunction) =>
      next(StatusError.notFound('')),
    );
  }
}

/**
 * Export the application.
 * We made it singleton to avoid accidental double invocation.
 */
export default new App().app;
