import { stylesSelect } from "../../styles/stylesSelect";
import Select, { GroupBase, OptionsOrGroups } from "react-select";

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
  value?: string;
  placeholder: string;
  isMulti?: true | undefined;
  isSearchable: boolean;
  noOptionsMessage?: () => string;
  id: string;
  onChange?:
    | (() => void | undefined)
    | ((event: React.ChangeEvent<HTMLSelectElement>) => void);
};

export default function SelectBox({
  options,
  placeholder,
  isMulti,
  isSearchable,
  noOptionsMessage,
  id,
}: SelectBoxProps) {
  return (
    <Select
      id={id}
      options={options}
      placeholder={placeholder}
      isMulti={isMulti}
      styles={stylesSelect}
      isSearchable={isSearchable}
      noOptionsMessage={noOptionsMessage}
    />
  );
}
