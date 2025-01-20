import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginData, signUpData } from "../utils/auth";

export interface FormData {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  id?: string;
  email: string;
  password: string;
}

export interface FormState {
  formData: FormData;
  loginCredentials: LoginCredentials;
  user: User;
  errors: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  isChecked: boolean;
}

const initialState: FormState = {
  formData: {
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  user: {
    id: "",
    email: "",
    name: "",
    isAuthenticated: false,
  },
  loginCredentials: {
    id: "",
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
};

export const signUp = createAsyncThunk<
  { id: string; formData: FormData; user: User },
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
  { id: string; loginCredentials: LoginCredentials; user: User },
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
    authentication(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<{ formData: FormData; user: User }>) => {
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
            loginCredentials: LoginCredentials;
            user: User;
          }>
        ) => {
          state.loginCredentials = action.payload.loginCredentials;
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

export const { setErrors, toggleChecked, authentication } = dataSlice.actions;
