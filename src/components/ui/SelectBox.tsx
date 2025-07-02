import { stylesSelect } from "../../styles/stylesSelect";
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  SingleValue,
} from "react-select";

type SelectBoxProps = {
  options?:
    | OptionsOrGroups<
        {
          value: string | undefined;
          label: string;
        },
        GroupBase<{
          value: string | undefined;
          label: string;
        }>
      >
    | undefined;
  value?:
    | { value: string | undefined; label: string }
    | { value: string | undefined; label: string }[]
    | null
    | undefined;
  placeholder: string;
  isMulti?: true | undefined;
  isSearchable: boolean;
  noOptionsMessage?: () => string;
  id: string;
  onChange?:
    | ((
        newValue:
          | MultiValue<{
              value: string | undefined;
              label: string;
            }>
          | SingleValue<{
              value: string | undefined;
              label: string;
            }>,
        actionMeta: ActionMeta<{
          value: string | undefined;
          label: string;
        }>
      ) => void)
    | undefined;
};

export default function SelectBox({
  options,
  placeholder,
  isMulti,
  isSearchable,
  noOptionsMessage,
  onChange,
  value,
  id,
}: SelectBoxProps) {
  return (
    <Select
      id={id}
      value={value}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
      styles={stylesSelect}
      isSearchable={isSearchable}
      noOptionsMessage={noOptionsMessage}
    />
  );
}
