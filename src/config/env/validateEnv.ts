import { config } from 'dotenv';
import { Joi } from 'celebrate';

config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('prod', 'dev', 'test').required(),
    NODE_PORT: Joi.number().required().default(4000),
    MONGO_CONNECTION_URL: Joi.string().required(),
    PASSWORD_SALT_ROUND: Joi.number().required().default(10),
    USER_ACCESS_TOKEN_SECRET: Joi.string().required().min(15),
    ACCESS_TOKEN_EXPIRED: Joi.number().required(),
    USER_REFRESH_TOKEN_SECRET: Joi.string().required().min(15),
    REFRESH_TOKEN_EXPIRED: Joi.number().required(),
    SMTP_AUTH_EMAIL: Joi.string().email().optional(),
    SMTP_AUTH_PASSWORD: Joi.string().optional(),
    SMTP_HOST: Joi.string().optional(),
    SMTP_PORT: Joi.number().optional(),
  })
  .unknown();

const { error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}
