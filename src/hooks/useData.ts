import {
  FormState,
  setErrors,
  signUp,
  FormData,
  login,
  LoginCredentials,
  authentication,
  User,
  logout,
} from "../store/dataSlice";
import { useDataDispatch, useDataSelector } from "../store/hooks";
import { RootState } from "../store/store";

export function useData() {
  const dispatch = useDataDispatch();
  const formData = useDataSelector((state: RootState) => state.data.formData);
  const loginCredentials = useDataSelector(
    (state: RootState) => state.data.loginCredentials
  );
  const errors = useDataSelector((state: RootState) => state.data.errors);
  const isChecked = useDataSelector((state: RootState) => state.data.isChecked);
  const user = useDataSelector((state: RootState) => state.data.user);

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

  return {
    formData,
    loginCredentials,
    user,
    errors,
    isChecked,
    signUp: signUpFormData,
    login: loginData,
    setErrors: updateErrors,
    authentication: updateAuth,
    logout: logoutUser,
  };
}
