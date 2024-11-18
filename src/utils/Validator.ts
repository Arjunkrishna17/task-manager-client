import { ErrorFields } from "../Types/Form";

export const validate = (
  fields: Object
): { isError: boolean; errFields: ErrorFields } => {
  let isError = false;
  const errFields: ErrorFields = {};

  Object.keys(fields).forEach((field) => {
    if (!fields[field as keyof typeof fields]) {
      errFields[field] = true; // Set the error for this field to true
      isError = true; // Set isError to true if any field is invalid
    }
  });

  return { isError, errFields };
};
