import { celebrate, Joi } from 'celebrate';

export const userSignup = celebrate({
  body: Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
  }),
});
