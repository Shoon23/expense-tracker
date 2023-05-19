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

const categoryUpdateSchema = Joi.object({
  categoryId: Joi.number().required(),
  name: Joi.string().required(),
});

const expenseCreateSchema = Joi.object({
  userId: Joi.number().required(),
  categoryId: Joi.number(),
  budgetId: Joi.number(),
  name: Joi.string().required(),
  amount: Joi.string().required(),
});

const expenseUpdateSchema = Joi.object({
  expensId: Joi.number().required(),
  name: Joi.string(),
  amount: Joi.string(),
  categoryId: Joi.number(),
  budgetId: Joi.number(),
});

export {
  registerSchema,
  loginSchema,
  categoryCreateSchema,
  categoryUpdateSchema,
  expenseCreateSchema,
  expenseUpdateSchema,
};
