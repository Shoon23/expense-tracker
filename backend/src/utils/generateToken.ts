import jwt from "jsonwebtoken";

const accessToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS as string, {
    expiresIn: "1hr",
  });
};

const refreshToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH as string, {
    expiresIn: "1hr",
  });
};

export default { accessToken, refreshToken };
