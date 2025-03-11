import { useState } from "react";
import Select from "react-select";
import { countryCodes } from "../../utils/countryCode";

export default function CountryCodeSelector() {
  const [countryCode, setCountryCode] = useState("+49");

  const options = countryCodes.map((code) => ({
    value: code.code,
    label: `(${code.code})${code.name} `,
  }));

  function handleCountryCodeChange(
    selectedOption: { value: string; label: string } | null
  ) {
    if (selectedOption) {
      setCountryCode(selectedOption.value);
    }
  }

  return (
    <div className="phone-input">
      <Select
        options={options}
        value={options.find((option) => option.value === countryCode)}
        onChange={handleCountryCodeChange}
        getOptionLabel={(option) => option.label}
        formatOptionLabel={(option) => <div>{option.label}</div>}
        placeholder={countryCode}
        styles={{
          control: (provided) => ({
            ...provided,
            height: "auto",
            maxWidth: "160px",
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
