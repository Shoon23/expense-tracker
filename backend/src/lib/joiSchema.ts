import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]")).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]")).required(),
});

const categoryCreateSchema = Joi.object({
  userId: Joi.number().required(),
  name: Joi.string().required(),
});

export { registerSchema, loginSchema, categoryCreateSchema };
