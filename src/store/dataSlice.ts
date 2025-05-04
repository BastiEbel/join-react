import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginData, logout as logoutAPI, signUpData } from "../utils/auth";
import { FormData } from "../types/FormData";
import { LoginCredentials } from "../types/Credentials";
import { User } from "../types/User";
import { FormState } from "../types/FormState";
import { addContact } from "../utils/contactData";
import { ContactData } from "../types/ContactData";

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
  contactData: [] as ContactData[], // Typisiere das leere Array explizit als ContactData[]
  errors: {
    name: "",
    email: "",
    phone: "",
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

export const logout = createAsyncThunk("data/logout", async () => {
  try {
    const response = await logoutAPI();
    return response;
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  }
});

export const addContactData = createAsyncThunk(
  "data/addContact",
  async (
    contactData: { userId: string; name: string; email: string; phone: string },
    { rejectWithValue }
  ) => {
    try {
      const response: ContactData = await addContact(contactData);
      return response;
    } catch {
      return rejectWithValue("Failed to add contact");
    }
  }
);

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
    setContactData(state, action: PayloadAction<ContactData[]>) {
      state.contactData = action.payload; // Speichere das Array im Zustand
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
      })
      .addCase(addContactData.fulfilled, (state, action) => {
        state.contactData.push(action.payload as ContactData);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          id: "",
          email: "",
          name: "",
          isAuthenticated: false,
        };
        state.loginCredentials = {
          id: "",
          email: "",
          password: "",
        };
        state.formData = {
          id: "",
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        };
        state.errors = {
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        };
        state.isChecked = false;
        state.contactData = [];
      });
  },
});

export const { setErrors, toggleChecked, authentication, setContactData } =
  dataSlice.actions;
