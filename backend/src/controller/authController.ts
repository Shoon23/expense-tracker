import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import * as argon2 from "argon2";
import generateToken from "../utils/generateToken";
import jwt from "jsonwebtoken";
import Joi from "joi";

// req body schema for register
const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]")).required(),
});

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await registerSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const { firstName, lastName, email, password } = value;

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
    next(error);
  }
};

// req body schema for login

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]")).required(),
});
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const { email, password } = value;
    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        lastName: true,
        firstName: true,
        id: true,
        password: true,
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
    next(error);
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
      select: {
        email: true,
        lastName: true,
        firstName: true,
        id: true,
      },
    });
    if (!checkUser) {
      throw new CustomError("User do not exists", 409);
    }

    const refreshToken = generateToken.refreshToken(checkUser.id);
    const accessToken = generateToken.accessToken(checkUser.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      signed: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    res.status(200).json({ ...checkUser, accessToken });
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
