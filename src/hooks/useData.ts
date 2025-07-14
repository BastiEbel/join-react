import { useCallback } from "react";
import {
  setErrors,
  signUp,
  login,
  authentication,
  logout,
  addContactData,
  setContactData,
  updateContactDataDB,
  setCategories,
  addAsyncTask,
  getAddTask,
} from "../store/dataSlice";
import { useDataDispatch, useDataSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { ContactData } from "../types/ContactData";
import { LoginCredentials } from "../types/Credentials";
import { FormData } from "../types/FormData";
import { FormState } from "../types/FormState";
import { User } from "../types/User";
import { getContact } from "../utils/contactData";
import { getCategories } from "../utils/categoryData";
import { AddTask, Category } from "../types/AddTask";
import { loadTasks } from "../utils/addTask";

export function useData() {
  const dispatch = useDataDispatch();
  const formData = useDataSelector((state: RootState) => state.data.formData);
  const loginCredentials = useDataSelector(
    (state: RootState) => state.data.loginCredentials
  );
  const errors = useDataSelector((state: RootState) => state.data.errors);
  const isChecked = useDataSelector((state: RootState) => state.data.isChecked);
  const user = useDataSelector((state: RootState) => state.data.user);
  const contactData = useDataSelector(
    (state: RootState) => state.data.contactData
  );
  const categories = useDataSelector(
    (state: RootState) => state.data.categories
  );
  const addTasksLoad = useDataSelector(
    (state: RootState) => state.data.addTask
  );

  const signUpFormData = async (data: FormData) => {
    const resultAction = await dispatch(signUp(data));
    if (signUp.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  };

  const loginData = async (loginCredentials: LoginCredentials) => {
    const resultAction = await dispatch(login(loginCredentials));
    if (login.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  };

  const updateAuth = (user: User) => {
    const resultUser = dispatch(authentication({ user }));
    return resultUser.payload.user;
  };

  const updateErrors = (errorData: Partial<FormState["errors"]>) => {
    dispatch(setErrors(errorData));
  };

  const logoutUser = async () => {
    const resultAction = await dispatch(logout());
    if (logout.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  };

  const addContactDataAsync = async (contactData: ContactData) => {
    if (!contactData.phone) {
      throw new Error("Phone number is required.");
    }
    const resultData = await dispatch(
      addContactData(
        contactData as {
          userId: string;
          name: string;
          email: string;
          phone: string;
          zipCode?: string;
        }
      )
    );
    if (addContactData.fulfilled.match(resultData)) {
      return resultData.payload;
    }
    return null;
  };

  const updateContactDataAsync = async (contactData: ContactData) => {
    if (!contactData.phone) {
      throw new Error("Phone number is required.");
    }
    try {
      const resultUpdateDate = await dispatch(
        updateContactDataDB(
          contactData as {
            id: string;
            userId: string;
            name: string;
            email: string;
            phone: string;
            zipCode?: string;
          }
        )
      );
      if (updateContactDataDB.fulfilled.match(resultUpdateDate)) {
        return resultUpdateDate.payload;
      }
      return null;
    } catch (error) {
      console.error("Error updating contact data:", error);
      throw error;
    }
  };

  const loadContactData = useCallback(async () => {
    try {
      const contacts = await getContact(user);

      if (!Array.isArray(contacts)) {
        throw new Error("Invalid data format: Expected an array of contacts.");
      }

      const contactDataSorted = contacts
        .filter((contact): contact is ContactData => contact && contact.name)
        .sort((a, b) => a.name.localeCompare(b.name));

      dispatch(setContactData(contactDataSorted));
    } catch (error) {
      console.error("Error loading contact data:", error);
    }
  }, [dispatch, user]);

  const loadCategories = useCallback(async () => {
    try {
      const response = await getCategories();
      if (!Array.isArray(response)) {
        throw new Error(
          "Invalid data format: Expected an array of categories."
        );
      }
      dispatch(setCategories(response));
    } catch (error) {
      console.error("Error loading categories:", error);
      return [];
    }
  }, [dispatch]);

  const loadAsyncTasksData = useCallback(
    async (userId: string, contactId?: string) => {
      try {
        const response: AddTask = await loadTasks(userId, contactId);
        if (!Array.isArray(response)) {
          throw new Error("Invalid data format: Expected an array of tasks.");
        }
        if (response.length !== 0) {
          dispatch(getAddTask(response));
        }

        return response;
      } catch (error) {
        console.error("Error loading tasks:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const addNewTask = useCallback(
    async (taskData: AddTask) => {
      try {
        const resultTask = await dispatch(
          addAsyncTask({
            userId: taskData.userId,
            title: taskData.title,
            description: taskData.description,
            contacts: taskData.contacts
              ? taskData.contacts.map((contact) => ({
                  ...contact,
                  value: contact.value ?? "",
                  label: contact.label ?? "",
                }))
              : undefined,
            category: taskData.category as Category,
            dueDate: taskData.dueDate ?? "",
            prio: taskData.prio,
            status: taskData.status,
          })
        );
        if (addAsyncTask.fulfilled.match(resultTask)) {
          return resultTask.payload;
        }
        throw new Error("Failed to add task");
      } catch (error) {
        console.error("Error adding task:", error);
        throw error;
      }
    },
    [dispatch]
  );

  return {
    formData,
    loginCredentials,
    user,
    errors,
    isChecked,
    contactData,
    addTasksLoad,
    loadContactData,
    loadCategories,
    loadAsyncTasksData,
    categories,
    signUp: signUpFormData,
    login: loginData,
    setErrors: updateErrors,
    authentication: updateAuth,
    logout: logoutUser,
    addContactData: addContactDataAsync,
    updateContactDataDB: updateContactDataAsync,
    addAsyncTask: addNewTask,
  };
}
