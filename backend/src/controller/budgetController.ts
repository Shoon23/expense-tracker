import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import prisma from "../lib/prisma";
import Joi from "joi";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }

    const budgetList = await prisma.budget.findMany({
      where: {
        AND: [{ userId: Number(userId) }, { isDelete: false }],
      },
    });
    res.status(200).json(budgetList);
  } catch (error) {
    next(error);
  }
};

// get budget as options controller
const getAsOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  try {
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }
    const budgetOptions = await prisma.budget.findMany({
      where: {
        userId: Number(userId),
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).json(budgetOptions);
  } catch (error) {
    next(error);
  }
};

// req body schema for creating budget
const budgetCreateSchema = Joi.object({
  userId: Joi.number().required(),
  name: Joi.string().required(),
  amount: Joi.string().required(),
  startAt: Joi.date().required(),
  endAt: Joi.date().required(),
});
const createBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await budgetCreateSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const createBudget = await prisma.budget.create({
      data: value,
    });

    res.status(201).json(createBudget);
  } catch (error) {
    next(error);
  }
};

// req body schema for creating budget
const budgetUpdateSchema = Joi.object({
  budgetId: Joi.number().required(),
  name: Joi.string().optional(),
  amount: Joi.string().optional(),
  startAt: Joi.date().optional(),
  endAt: Joi.date().optional(),
}).or("name", "amount", "startAt", "endAt");

const updateBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await budgetUpdateSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    res.json(value);
  } catch (error) {
    next(error);
  }
};

const deleteBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const budgetId = req.params.budgeId;
  try {
    if (!budgetId || isNaN(Number(budgetId))) {
      throw new CustomError("Invalid or Missing budgetId", 401);
    }
    await prisma.budget.update({
      where: {
        id: Number(budgetId),
      },
      data: {
        isDelete: true,
      },
    });
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

const getAllExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const budgetId = req.params.budgetId;

  try {
    if (!budgetId || isNaN(Number(budgetId))) {
      throw new CustomError("Invalid or Missing budgetId", 401);
    }

    const expenseList = await prisma.budget.findUnique({
      where: {
        id: Number(budgetId),
      },
      include: {
        expenses: true,
      },
    });
    res.status(200).json(expenseList);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  createBudget,
  updateBudget,
  deleteBudget,
  getAllExpense,
  getAsOptions,
};
