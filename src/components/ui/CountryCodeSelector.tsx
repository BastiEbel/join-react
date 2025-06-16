import Select from "react-select";
import { countryCodes } from "../../utils/countryCode";
import { useState } from "react";

interface CountryCodeProps {
  zipCode: (code: string) => void;
  value: string;
}

export default function CountryCodeSelector({
  zipCode,
  value,
}: CountryCodeProps) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const options = countryCodes.map((code) => ({
    value: code.code,
    label: `(${code.code}) ${code.name} `,
  }));

  function handleCountryCodeChange(
    selectedOption: { value: string; label: string } | null
  ) {
    if (selectedOption) {
      zipCode(selectedOption.value);
    }
  }

  return (
    <div className={menuIsOpen ? "" : "countryCode-zipCode"}>
      <Select
        options={options}
        value={options.find((option) => option.value === value) || null}
        onChange={handleCountryCodeChange}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        getOptionLabel={(option) => option.label}
        formatOptionLabel={(option) => (
          <div>{menuIsOpen ? option.label : option.value}</div>
        )}
        placeholder={value}
        isSearchable={false}
        styles={{
          control: (provided) => ({
            ...provided,
            height: "auto",
            border: "unset",
            cursor: "pointer",
          }),
          menu: (provided) => ({
            ...provided,
            height: "auto",
            width: "250px",
            overflowY: "auto",
          }),
        }}
      />
    </div>
  );
}
