import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import prisma from "../lib/prisma";
import Joi from "joi";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  const page = req?.query?.page;
  const limit = req?.query?.limit || 10;
  const skip = (Number(page) - 1) * Number(limit);
  try {
    if (!page || isNaN(Number(page))) {
      throw new CustomError("Invalid or Missing Page Number", 401);
    }
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }

    const [budgetList, totalCount] = await prisma.$transaction([
      prisma.budget.findMany({
        skip,
        take: Number(limit),
        where: {
          AND: [{ userId: Number(userId) }, { isDelete: false }],
        },
        select: {
          id: true,
          name: true,
          amount: true,
          description: true,
          createdAt: true,
        },
      }),
      prisma.budget.count({
        where: {
          AND: [{ userId: Number(userId) }, { isDelete: false }],
        },
      }),
    ]);

    const isLastPage =
      (Number(page) - 1) * Number(limit) + budgetList.length >= totalCount;
    res.status(200).json({ budgetList, isLastPage });
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

// delete budget
const deleteBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const budgetId = req.params.budgetId;
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
// get budget expenses

const getAllExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const budgetId = req.params.budgetId;

  // pagination
  const page = req?.query?.page;
  const limit = req?.query?.limit || 10;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    if (!page || isNaN(Number(page))) {
      throw new CustomError("Invalid or Missing Page Number", 401);
    }
    if (!budgetId || isNaN(Number(budgetId))) {
      throw new CustomError("Invalid or Missing budgetId", 401);
    }

    const [expense, totalCount] = await prisma.$transaction([
      prisma.expense.findMany({
        where: {
          budgetId: Number(budgetId),
          isDelete: false,
        },
        select: {
          id: true,
          name: true,
          amount: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
              isDelete: true,
            },
          },
        },
        take: Number(limit),
        skip,
      }),
      prisma.expense.count({
        where: {
          budgetId: Number(budgetId),
          isDelete: false,
        },
      }),
    ]);
    const isLastPage =
      (Number(page) - 1) * Number(limit) + expense.length >= totalCount;

    const expenseList = expense.map((expense) => ({
      ...expense,
      category: expense.category?.isDelete
        ? null
        : {
            id: expense.category?.id,
            name: expense.category?.name,
          },
    }));
    res.status(200).json({ expenseList, isLastPage });
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
