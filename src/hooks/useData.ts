import { useCallback } from "react";
import {
  setErrors,
  signUp,
  login,
  authentication,
  logout,
  addContactData,
  setContactData,
} from "../store/dataSlice";
import { useDataDispatch, useDataSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { ContactData } from "../types/ContactData";
import { LoginCredentials } from "../types/Credentials";
import { FormData } from "../types/FormData";
import { FormState } from "../types/FormState";
import { User } from "../types/User";
import { getContact } from "../utils/contactData";

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
        }
      )
    );
    if (addContactData.fulfilled.match(resultData)) {
      return resultData.payload;
    }
    return null;
  };

  const loadContactData = useCallback(async () => {
    try {
      const contacts = await getContact(user);

      if (!Array.isArray(contacts)) {
        throw new Error("Invalid data format: Expected an array of contacts.");
      }

      const contactDataSorted = contacts
        .filter((contact): contact is ContactData => contact && contact.name) // Typprüfung
        .sort((a, b) => a.name.localeCompare(b.name));

      dispatch(setContactData(contactDataSorted)); // Übergibt ein Array von ContactData
    } catch (error) {
      console.error("Error loading contact data:", error);
    }
  }, [dispatch, user]);

  return {
    formData,
    loginCredentials,
    user,
    errors,
    isChecked,
    contactData,
    signUp: signUpFormData,
    login: loginData,
    setErrors: updateErrors,
    authentication: updateAuth,
    logout: logoutUser,
    addContactData: addContactDataAsync,
    loadContactData,
  };
}
