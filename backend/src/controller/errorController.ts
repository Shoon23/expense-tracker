import { Prisma } from "@prisma/client";
import CustomError from "../utils/CustomError";
import { NextFunction, Request, Response } from "express";
export default (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(500).json({ error: "Prisma error occurred" });
    if (err.code === "P2025") {
      next(
        new CustomError("Cannot Find Foreign key or Cannot Find the item", 404)
      );
    }
  }

  const statusCode = err?.status ?? 500;
  const errMessage = err?.message ?? "Something went wrong";
  res.status(statusCode).json({ error: errMessage });
};
