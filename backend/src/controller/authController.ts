import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import authValidationFields from "../utils/authValidationFields";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import * as argon2 from "argon2";
import generateToken from "../utils/generateToken";
import jwt from "jsonwebtoken";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req?.body;
    authValidationFields({ firstName, lastName, email, password }, false);
    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (checkUser) {
      throw new CustomError("User already exists", 409);
    }
    const hashPassword = await argon2.hash(password);

    const createUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashPassword,
      },
      select: {
        email: true,
        lastName: true,
        firstName: true,
        id: true,
      },
    });

    const refreshToken = generateToken.refreshToken(createUser.id);
    const accessToken = generateToken.accessToken(createUser.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      signed: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    res.status(201).json({ ...createUser, accessToken });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
  }
};
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };
  try {
    authValidationFields({ email, password }, true);

    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkUser) {
      throw new CustomError("User do not exists", 409);
    }

    const isMatch = await argon2.verify(checkUser.password, password);
    if (!isMatch) {
      throw new CustomError("Password Not Matched", 401);
    }

    const { password: hashPassword, ...other } = checkUser;

    const refreshToken = generateToken.refreshToken(checkUser.id);
    const accessToken = generateToken.accessToken(checkUser.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      signed: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    res.status(201).json({ ...other, accessToken });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new CustomError("Prisma error occurred", 500));
    } else {
      next(error);
    }
  }
};

const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken").json({
    message: "Successfully logout",
  });
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.refreshToken;
  try {
    const checkToken = jwt.verify(token, process.env.JWT_REFRESH as string) as {
      id: number;
      iat: number;
      exp: number;
    };
    const checkUser = await prisma.user.findUnique({
      where: {
        id: checkToken.id,
      },
    });
    if (!checkUser) {
      throw new CustomError("User do not exists", 409);
    }

    const refreshToken = generateToken.refreshToken(checkUser.id);
    const accessToken = generateToken.accessToken(checkUser.id);

    const { password, ...other } = checkUser;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      signed: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    res.status(200).json({ ...other, accessToken });
  } catch (error) {
    next(new CustomError("Unauthorized", 401));
  }
};
export default {
  registerController,
  loginController,
  logoutController,
  refreshToken,
};
