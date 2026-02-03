import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { env } from "../env";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new CustomError("Missing Token", 409);
    }
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(accessToken, env.JWT_ACCESS);
    next();
  } catch (error) {
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      next(new CustomError("Invalid Token", 401));
    } else {
      next(error);
    }
    next(error);
  }
};
