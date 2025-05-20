import { useCallback } from "react";
import { FormData } from "../types/FormData";

export type AuthValidationErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function useAuthValidation(isLogIn: boolean) {
  const validateField = useCallback(
    (field: keyof FormData, value: string, inputData: FormData): string => {
      switch (field) {
        case "name":
          if (isLogIn) return "";
          if (!value) return "Name is required";
          return /^[a-zA-Z\s]*$/.test(value)
            ? ""
            : "Name can only contain letters and spaces";
        case "email":
          if (!value) return "Email is required";
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email format";
        case "password":
          if (!value) return "Password is required";
          return value.length >= 8
            ? ""
            : "Password must be at least 8 characters";
        case "confirmPassword":
          if (isLogIn) return "";
          if (value !== inputData.password) return "Passwords do not match";
          return "";
        default:
          return "";
      }
    },
    [isLogIn]
  );

  const validateForm = useCallback(
    (inputData: FormData) => {
      const errors: AuthValidationErrors = {
        name: validateField("name", inputData.name, inputData),
        email: validateField("email", inputData.email, inputData),
        password: validateField("password", inputData.password, inputData),
        confirmPassword: validateField(
          "confirmPassword",
          inputData.confirmPassword,
          inputData
        ),
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
