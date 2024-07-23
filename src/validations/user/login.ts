import { celebrate, Joi } from 'celebrate';

export const userLogin = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().min(6),
  }),
});
