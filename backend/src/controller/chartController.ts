import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import CustomError from "../utils/CustomError";

const getMonthlyExpenseTrend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }
    const expenses = await prisma.expense.findMany({
      where: {
        AND: [{ userId: Number(userId) }, { isDelete: false }],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const monthlyExpenses: any = {};
    expenses.forEach((expense) => {
      const month = expense.createdAt.getMonth() + 1; // Months are zero-indexed
      const year = expense.createdAt.getFullYear();
      const monthKey = `${year}-${month}`;

      if (!monthlyExpenses[monthKey]) {
        monthlyExpenses[monthKey] = 0;
      }

      monthlyExpenses[monthKey] += Number(expense.amount);
    });
    res.status(200).json(monthlyExpenses);
  } catch (error) {
    next(error);
  }
};

const getCategoryDistribution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }

    const categoryExpenses = await prisma.category.findMany({
      where: {
        AND: [{ userId: Number(userId) }, { isDelete: false }],
      },
      select: {
        expenses: {
          select: {
            amount: true,
          },
        },
        name: true,
      },
    });

    const categoryDistribution = categoryExpenses.map((category) => ({
      category: category.name,
      totalExpenses: category.expenses.reduce(
        (total, expense) => total + parseInt(expense.amount),
        0
      ),
    }));

    res.status(200).json(categoryDistribution);
  } catch (error) {
    next(error);
  }
};

export default {
  getMonthlyExpenseTrend,
  getCategoryDistribution,
};
