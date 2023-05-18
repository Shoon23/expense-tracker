import CustomError from "./CustomError";

export default (data: any, isLogin: boolean) => {
  let requiredFields;
  if (isLogin) {
    requiredFields = ["email", "password"];
  } else {
    requiredFields = ["firstName", "lastName", "email", "password"];
  }

  const missingFields = requiredFields.filter((key) => {
    const value = data[key];
    return !data.hasOwnProperty(key) || value === "";
  });

  if (missingFields.length > 0) {
    throw new CustomError(
      `Invalid or missing ${missingFields.join(", ")}`,
      400
    );
  }
};
