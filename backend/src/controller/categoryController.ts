import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import CustomError from "../utils/CustomError";
import prisma from "../lib/prisma";
import buildWhereClause from "../utils/buildWhereClause";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  // pagination
  const page = req?.query?.page;
  const limit = req?.query?.limit || 10;
  const skip = (Number(page) - 1) * Number(limit);

  // filter
  const searchKey = req?.query?.searchKey;
  try {
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }

    const where = buildWhereClause({ userId, searchKey, isAmount: false });

    const [category, totalCount] = await prisma.$transaction([
      prisma.category.findMany({
        skip,
        take: Number(limit),
        where,
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          expenses: {
            select: {
              isDelete: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma?.category?.count({
        where,
      }),
    ]);

    const categoryList = category?.map((category) => ({
      ...category,
      expenses: category?.expenses?.reduce(
        (total, expense: { isDelete: boolean }) => {
          return expense?.isDelete ? total : total + 1;
        },
        0
      ),
    }));

    const isLastPage =
      (Number(page) - 1) * Number(limit) + categoryList.length >= totalCount;

    res.status(200).json({ categoryList, isLastPage });
  } catch (error) {
    next(error);
  }
};

// get category as options
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
    const categoryOptions = await prisma.category.findMany({
      where: {
        userId: Number(userId),
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
      },
    });
    res.status(200).json(categoryOptions);
  } catch (error) {
    next(error);
  }
};

// get category expenses
const getAllExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.categoryId;

  // pagination
  const page = req?.query?.page;
  const limit = req?.query?.limit || 10;
  const skip = (Number(page) - 1) * Number(limit);

  //filter
  const searchKey = req?.query?.searchKey;

  console.log(searchKey);

  try {
    if (!page || isNaN(Number(page))) {
      throw new CustomError("Invalid or Missing Page Number", 401);
    }
    if (!categoryId || isNaN(Number(categoryId))) {
      throw new CustomError("Invalid or Missing budgetId", 401);
    }
    const where = buildWhereClause({ categoryId, searchKey, isAmount: true });
    const [expense, totalCount] = await prisma.$transaction([
      prisma.expense.findMany({
        where,
        select: {
          id: true,
          name: true,
          amount: true,
          createdAt: true,
          budget: {
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
        where,
      }),
    ]);
    const isLastPage =
      (Number(page) - 1) * Number(limit) + expense.length >= totalCount;

    const expenseList = expense.map((expense) => ({
      ...expense,
      category: expense.budget?.isDelete
        ? null
        : {
            id: expense.budget?.id,
            name: expense.budget?.name,
          },
    }));
    res.status(200).json({ expenseList, isLastPage });
  } catch (error) {
    next(error);
  }
};

// req body schema for creating category
const categoryCreateSchema = Joi.object({
  userId: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string(),
});
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await categoryCreateSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const create = await prisma.category.create({
      data: value,
    });

    res.status(201).json(create);
  } catch (error) {
    next(error);
  }
};

// req body schema for updating category

const categoryUpdateSchema = Joi.object({
  categoryId: Joi.number().required(),
  name: Joi.string().optional().allow(null),
  description: Joi.string().optional().allow(null),
}).or("name", "description");

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await categoryUpdateSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const { categoryId, ...other } = value;
    const updateCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: other,
    });
    res.status(200).json(updateCategory);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.categoryId;
  try {
    if (!categoryId || isNaN(Number(categoryId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }
    await prisma.category.update({
      where: {
        id: Number(categoryId),
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

// delete category expense
const deleteCategoryExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expenseId = req?.params?.expenseId;
  try {
    if (!expenseId || isNaN(Number(expenseId))) {
      throw new CustomError("Invalid or Missing Expense Id", 401);
    }
    await prisma.expense.update({
      where: {
        id: Number(expenseId),
      },
      data: {
        categoryId: null,
      },
    });
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

export default {
  getAllExpense,
  getAll,
  createCategory,
  updateCategory,
  deleteCategory,
  getAsOptions,
  deleteCategoryExpense,
};
