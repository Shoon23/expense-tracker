import CustomError from "./CustomError";

// validate the field for create
const validateRequiredFields = (data: any) => {
  const numberFields = ["budgetId", "expenseId", "categoryId"];

  for (const key in data) {
    const value = data[key];

    if (numberFields.includes(key)) {
      if (isNaN(Number(value))) {
        throw new CustomError(`Invalid ${key}`, 400);
      }
    } else {
      if (!value || typeof value !== "string") {
        throw new CustomError(`Invalid or missing ${key}`, 400);
      }
    }
  }
};

// validate the fields for update
const validateUpdateFields = (data: any) => {
  const requiredFields = ["categoryId", "budgetId", "name", "amount"];

  const isExpenseIdPresent = data.hasOwnProperty("expenseId");

  if (!isExpenseIdPresent) {
    throw new CustomError("Missing Expense Id", 400);
  }

  const missingFields = requiredFields.filter(
    (key) => !data.hasOwnProperty(key)
  );

  if (missingFields.length === requiredFields.length) {
    const possibleFields = requiredFields.join(", ");
    throw new CustomError(
      `Missing Fields. Possible fields: ${possibleFields}`,
      400
    );
  }

  for (const key in data) {
    const value = data[key];
    if (!value) {
      throw new CustomError(`Invalid or missing ${key}`, 400);
    }
  }

  if (isNaN(Number(data["amount"]))) {
    throw new CustomError("Amount Field Must be Number", 400);
  }
};

export { validateRequiredFields, validateUpdateFields };
