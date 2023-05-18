import CustomError from "./CustomError";

// Validate the fields for create
const validateRequiredFields = (data: any) => {
  const requiredFields = ["userId", "name"];

  const missingFields = requiredFields.filter(
    (key) => !data.hasOwnProperty(key)
  );

  if (missingFields.length > 0) {
    throw new CustomError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }
  const missingValues: string[] = [];

  Object.entries(data).map(([key, value]) => {
    if (!requiredFields.includes(key)) {
      throw new CustomError(
        `Accepted Fields. Only '${requiredFields.join(
          ", "
        )}' fields are allowed`,
        400
      );
    }
    if (
      requiredFields.includes(key) &&
      (value === undefined || value === null || value === "")
    ) {
      missingValues.push(key);
    }
  });

  if (missingValues.length > 0) {
    throw new CustomError(
      `Missing values for fields: ${missingValues.join(", ")}`,
      400
    );
  }

  if (missingValues.length > 0) {
    throw new CustomError(
      `Missing values for: ${missingValues.join(", ")}`,
      400
    );
  }
  if (isNaN(Number(data["userId"]))) {
    throw new CustomError(
      `Invalid value for field "userId". It must be a number`,
      400
    );
  }
};

const validateUpdateFields = (data: any) => {
  const requiredFields = ["name", "categoryId"];

  const missingFields = requiredFields.filter(
    (key) => !data.hasOwnProperty(key)
  );

  if (missingFields.length > 0) {
    throw new CustomError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  const missingValues: string[] = [];
  Object.entries(data).map(([key, value]) => {
    if (!requiredFields.includes(key)) {
      throw new CustomError(
        `Accepted Fields. Only '${requiredFields.join(
          ", "
        )}' fields are allowed`,
        400
      );
    }
    if (
      requiredFields.includes(key) &&
      (value === undefined || value === null || value === "")
    ) {
      missingValues.push(key);
    }
  });
  if (missingValues.length > 0) {
    throw new CustomError(
      `Missing values for: ${missingValues.join(", ")}`,
      400
    );
  }
  if (isNaN(Number(data["categoryId"]))) {
    throw new CustomError(
      `Invalid value for field "userId". It must be a number`,
      400
    );
  }
};

export { validateRequiredFields, validateUpdateFields };
