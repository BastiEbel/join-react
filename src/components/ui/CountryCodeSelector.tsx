import Select from "react-select";
import { countryCodes } from "../../utils/countryCode";
import { useState } from "react";

interface CountryCodeProps {
  zipCode: (code: string) => void;
}

export default function CountryCodeSelector({ zipCode }: CountryCodeProps) {
  const [countryCode, setCountryCode] = useState<string>("+49");
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const options = countryCodes.map((code) => ({
    value: code.code,
    label: `(${code.code}) ${code.name} `,
  }));

  function handleCountryCodeChange(
    selectedOption: { value: string; label: string } | null
  ) {
    if (selectedOption) {
      setCountryCode(selectedOption.value);
      zipCode(selectedOption.value);
    }
  }

  return (
    <div className={menuIsOpen ? "" : "countryCode-zipCode"}>
      <Select
        options={options}
        value={options.find((option) => option.value === countryCode) || null}
        onChange={handleCountryCodeChange}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        getOptionLabel={(option) => option.label}
        formatOptionLabel={(option) => (
          <div>{menuIsOpen ? option.label : option.value}</div>
        )}
        placeholder={countryCode}
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
