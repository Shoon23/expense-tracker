import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import CustomError from "../utils/CustomError";
import prisma from "../lib/prisma";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  try {
    if (!userId || isNaN(Number(userId))) {
      throw new CustomError("Invalid or Missing UserId", 401);
    }
    const categoryList = await prisma.category.findMany({
      where: {
        AND: [{ userId: Number(userId) }, { isDelete: false }],
      },
    });
    res.status(200).json(categoryList);
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

// req body schema for creating category
const categoryCreateSchema = Joi.object({
  userId: Joi.number().required(),
  name: Joi.string().required(),
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
    const { userId, name } = value;
    const create = await prisma.category.create({
      data: {
        userId: userId,
        name,
      },
    });

    res.status(201).json(create);
  } catch (error) {
    next(error);
  }
};

// req body schema for updating category

const categoryUpdateSchema = Joi.object({
  categoryId: Joi.number().required(),
  name: Joi.string().required(),
});

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await categoryUpdateSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const { name, categoryId } = value;
    const updateCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
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

export default {
  getAll,
  createCategory,
  updateCategory,
  deleteCategory,
  getAsOptions,
};
