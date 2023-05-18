import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import {
  validateRequiredFields,
  validateUpdateFields,
} from "../utils/categoryValidationFields";

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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryDetails = req.body;
  try {
    validateRequiredFields(categoryDetails);
    const { userId, name } = categoryDetails;
    const create = await prisma.category.create({
      data: {
        userId: Number(userId),
        name,
      },
    });

    res.status(201).json(create);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateUpdateFields(req.body);
    const { name, categoryId } = req.body;
    const updateCategory = await prisma.category.update({
      where: {
        id: Number(categoryId),
      },
      data: {
        name,
      },
    });
    res.status(200).json(updateCategory);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
  }
};

export default { getAll, createCategory, updateCategory, deleteCategory };
