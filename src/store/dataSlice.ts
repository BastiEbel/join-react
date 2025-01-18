import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginData, signUpData } from "../utils/auth";

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface FormState {
  formData: FormData;
  loginCredentials: LoginCredentials;
  errors: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  isChecked: boolean;
  isAuthenticated: boolean;
}

const initialState: FormState = {
  formData: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  loginCredentials: {
    email: "",
    password: "",
  },
  errors: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  isChecked: false,
  isAuthenticated: false,
};

export const signUp = createAsyncThunk<
  { userId: string; formData: FormData },
  FormData,
  { rejectValue: Partial<FormState["errors"]> }
>("data/signUp", async (formData: FormData, { rejectWithValue }) => {
  try {
    const response = await signUpData(formData);
    return response;
  } catch (error) {
    console.log("Sign up error:", error);

    return rejectWithValue({
      name: "Error during sign up",
      email: "Please check your email",
      password: "Password is too weak",
      confirmPassword: "Passwords do not match",
    });
  }
});

export const login = createAsyncThunk<
  { userId: string; loginCredentials: LoginCredentials },
  LoginCredentials,
  { rejectValue: string }
>("data/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginData(credentials);
    return response;
  } catch (error) {
    console.log("Login error", error);
    return rejectWithValue("Invalid credentials");
  }
});

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setErrors(state, action: PayloadAction<Partial<FormState["errors"]>>) {
      state.errors = { ...state.errors, ...action.payload };
    },
    toggleChecked(state) {
      state.isChecked = !state.isChecked;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        signUp.fulfilled,
        (
          state,
          action: PayloadAction<{ userId: string; formData: FormData }>
        ) => {
          state.formData = action.payload.formData;
          state.errors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          };
        }
      )
      .addCase(signUp.rejected, (state, action) => {
        if (action.payload) {
          state.errors = { ...state.errors, ...action.payload };
        }
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{
            userId: string;
            loginCredentials: LoginCredentials;
          }>
        ) => {
          state.loginCredentials = action.payload.loginCredentials;
          state.isAuthenticated = true;
          state.errors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          };
        }
      )
      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.errors = { ...state.errors, password: action.payload };
        }
      });
  },
});

export const { setErrors, toggleChecked } = dataSlice.actions;
