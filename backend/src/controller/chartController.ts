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
        userId: Number(userId),
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

export default {
  getMonthlyExpenseTrend,
};
