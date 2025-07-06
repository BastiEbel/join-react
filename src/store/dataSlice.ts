import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginData, logout as logoutAPI, signUpData } from "../utils/auth";
import { FormData } from "../types/FormData";
import { LoginCredentials } from "../types/Credentials";
import { User } from "../types/User";
import { FormState } from "../types/FormState";
import { addContact, updateContact } from "../utils/contactData";
import { ContactData } from "../types/ContactData";
import { Category } from "../types/Category";
import { addTask } from "../utils/addTask";
import { AddTask, Category as AddTaskCategory } from "../types/AddTask";

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
  contactData: [] as ContactData[],
  categories: [] as Category[],
  addTask: {
    id: "",
    userId: "",
    title: "",
    description: "",
    category: null,
    dueDate: "",
    priority: "",
  } as AddTask,
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
    contactData: {
      userId: string;
      name: string;
      email: string;
      phone: string;
      zipCode?: string;
    },
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

export const updateContactDataDB = createAsyncThunk<
  ContactData,
  ContactData,
  { rejectValue: string }
>(
  "data/updateContact",
  async (contactData: ContactData, { rejectWithValue }) => {
    try {
      const response = await updateContact(contactData);
      return response;
    } catch (error) {
      console.error("Update contact error", error);
      return rejectWithValue("Failed to update contact");
    }
  }
);

export const addAsyncTask = createAsyncThunk<
  AddTask,
  {
    userId: string;
    title: string;
    description: string;
    contacts?: { value: string; label: string }[];
    category: AddTaskCategory;
    dueDate: string;
    priority: string;
  },
  { rejectValue: string }
>("data/addTask", async (taskData, { rejectWithValue }) => {
  try {
    const response = await addTask(taskData);
    return response as unknown as AddTask;
  } catch (error) {
    console.error("Add task error", error);
    return rejectWithValue("Failed to add task");
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
    setContactData(state, action: PayloadAction<ContactData[]>) {
      state.contactData = action.payload;
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    getAddTask(state, action: PayloadAction<AddTask>) {
      state.addTask = action.payload;
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
      .addCase(updateContactDataDB.fulfilled, (state, action) => {
        const index = state.contactData.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contactData[index] = action.payload;
        }
      })
      .addCase(addAsyncTask.fulfilled, (state, action) => {
        if (action.payload) {
          state.addTask = action.payload;
        }
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

export const {
  setErrors,
  toggleChecked,
  authentication,
  setContactData,
  setCategories,
  getAddTask,
} = dataSlice.actions;
