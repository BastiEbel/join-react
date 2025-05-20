import { useCallback } from "react";
import { ContactData } from "../types/ContactData";

export type ValidationErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

export function useContactValidation() {
  const validateField = useCallback(
    (field: keyof ContactData, value: string): string => {
      switch (field) {
        case "name":
          return /^[a-zA-Z\s]*$/.test(value)
            ? ""
            : "Name can only contain letters and spaces";
        case "email":
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email format";
        case "phone":
          return /^\d+$/.test(value) ? "" : "Phone can only contain numbers";
        default:
          return "";
      }
    },
    []
  );

  const validateForm = useCallback(
    (inputData: ContactData) => {
      const errors: ValidationErrors = {
        name: validateField("name", inputData.name),
        email: validateField("email", inputData.email),
        phone: validateField("phone", inputData.phone || ""),
      };
      return {
        errors,
        isValid: Object.values(errors).every((err) => !err),
      };
    },
    [validateField]
  );

  return { validateField, validateForm };
}
