import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signUpData } from "../utils/auth";

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormState {
  formData: FormData;
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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      });
  },
});

export const { setErrors, toggleChecked } = dataSlice.actions;
