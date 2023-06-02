import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import prisma from "../lib/prisma";
import Joi, { number } from "joi";
// get all expense
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const searchKey = req?.query?.searchKey;
  const page = req?.query?.page;
  const limit = req?.query?.limit || 10;
  const skip = (Number(page) - 1) * Number(limit);
  try {
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }

    const expenseList = await prisma.expense.findMany({
      take: limit as number,
      skip,
      where: {
        AND: [
          { userId: Number(userId) },
          { isDelete: false },
          searchKey
            ? {
                OR: [
                  { name: { contains: searchKey as string } },
                  { amount: { contains: searchKey as string } },
                ],
              }
            : {},
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        amount: true,
        createdAt: true,
        category: {
          select: {
            name: true,
            id: true,
          },
        },
        budget: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const budgetOptions = await prisma.budget.findMany({
      where: {
        AND: [{ userId: Number(userId) }, { isDelete: false }],
      },
      select: {
        id: true,
        name: true,
      },
    });
    const categoryOptions = await prisma.category.findMany({
      where: {
        AND: [{ userId: Number(userId) }, { isDelete: false }],
      },
      select: {
        id: true,
        name: true,
      },
    });
    res.status(200).json({ expenseList, categoryOptions, budgetOptions });
  } catch (error) {
    next(error);
  }
};

// get dashboard data
const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }
    const expenseList = await prisma.expense.findMany({
      take: 10,
      where: {
        AND: [{ userId: Number(userId) }, { isDelete: false }],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        amount: true,
        category: {
          select: {
            name: true,
          },
        },
        budget: {
          select: {
            name: true,
          },
        },
      },
    });

    const getBudgets = await prisma.budget.findMany({
      where: {
        AND: [{ userId: Number(userId) }, { isDelete: false }],
      },
      select: {
        id: true,
        name: true,
        amount: true,
        expenses: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            amount: true,
            id: true,
            name: true,
          },
        },
      },
    });

    const budgetList = getBudgets.map((budget) => ({
      ...budget,
      recentExpense: budget.expenses[0] || null,
      expenses: budget.expenses.reduce(
        (total, expense) => Number(total) + Number(expense.amount),
        0
      ),
    }));

    res.status(200).json({ expenseList, budgetList });
  } catch (error) {
    next(error);
  }
};

// req body schema for creating expense or transaction
const expenseCreateSchema = Joi.object({
  userId: Joi.number().required(),
  categoryId: Joi.number(),
  budgetId: Joi.number(),
  name: Joi.string().required(),
  amount: Joi.string().required(),
});

const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await expenseCreateSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const { userId, categoryId, budgetId, name, amount } = value;

    const createExpense = await prisma.expense.create({
      data: {
        amount,
        name,
        userId: userId,
        categoryId: categoryId || null,
        budgetId: budgetId || null,
      },
    });
    res.status(201).json(createExpense);
  } catch (error) {
    next(error);
  }
};

// req body schema for updating expense or transaction
const expenseUpdateSchema = Joi.object({
  expenseId: Joi.number().required(),
  name: Joi.string(),
  amount: Joi.string(),
  categoryId: Joi.number().allow(null),
  budgetId: Joi.number().allow(null),
});
const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await expenseUpdateSchema.validateAsync(req.body);

    const { expenseId, ...other } = value;

    const updateExpense = await prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: other,
      select: {
        id: true,
        name: true,
        amount: true,
        category: {
          select: {
            name: true,
          },
        },
        budget: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json(updateExpense);
  } catch (error) {
    next(error);
  }
};
// delete expense
const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expenseId = req.params.expenseId;
  try {
    if (!expenseId || isNaN(Number(expenseId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }
    await prisma.expense.update({
      where: {
        id: Number(expenseId),
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

export default {
  getAll,
  getDashboard,
  createExpense,
  updateExpense,
  deleteExpense,
};
