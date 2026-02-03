import jwt from "jsonwebtoken";
import { env } from "../env";

const accessToken = (id: any) => {
  return jwt.sign({ id }, env.JWT_ACCESS, {
    expiresIn: "1hr",
  });
};

const refreshToken = (id: any) => {
  return jwt.sign({ id }, env.JWT_REFRESH, {
    expiresIn: "1hr",
  });
};

export default { accessToken, refreshToken };
