import CustomError from "../utils/CustomError";
import { NextFunction, Request, Response } from "express";
export default (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err?.status ?? 500;
  const errMessage = err?.message ?? "Something went wrong";
  res.status(statusCode).json({ error: errMessage });
};
