import { FormState, setErrors, signUp, FormData } from "../store/dataSlice";
import { useDataDispatch, useDataSelector } from "../store/hooks";
import { RootState } from "../store/store";

export function useData() {
  const dispatch = useDataDispatch();
  const formData = useDataSelector((state: RootState) => state.data.formData);
  const errors = useDataSelector((state: RootState) => state.data.errors);
  const isChecked = useDataSelector((state: RootState) => state.data.isChecked);

  const updateFormData = async (data: FormData) => {
    const resultAction = await dispatch(signUp(data));
    if (signUp.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  };

  const updateErrors = (errorData: Partial<FormState["errors"]>) => {
    dispatch(setErrors(errorData));
  };

  return {
    formData,
    errors,
    isChecked,
    signUp: updateFormData,
    setErrors: updateErrors,
  };
}
