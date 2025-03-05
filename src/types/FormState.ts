import { LoginCredentials } from "./Credentials";
import { FormData } from "./FormData";
import { User } from "./User";

export interface FormState {
  formData: FormData;
  loginCredentials: LoginCredentials;
  user: User;
  errors: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword: string;
  };
  isChecked: boolean;
}
