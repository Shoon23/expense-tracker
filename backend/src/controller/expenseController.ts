import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import prisma from "../lib/prisma";
import { expenseCreateSchema, expenseUpdateSchema } from "../lib/joiSchema";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }
    const expenseList = await prisma.expense.findMany({
      where: {
        AND: [{ userId: Number(userId) }, { isDelete: false }],
      },
    });
    res.status(200).json(expenseList);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
  }
};

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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code === "P2025") {
        next(new CustomError("Cannot Find Foreign key", 404));
      }
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
  }
};

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
    });
    res.status(200).json(updateExpense);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code === "P2025") {
        next(new CustomError("Cannot Find Expense", 404));
      }
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
  }
};

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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code === "P2025") {
        next(new CustomError("Cannot Find Expense", 404));
      }
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
  }
};

export default {
  getAll,
  createExpense,
  updateExpense,
  deleteExpense,
};
