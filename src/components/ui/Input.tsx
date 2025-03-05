import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
  name?: string;
  icon?: string;
  labelText?: ReactNode;
  placeholder: string;
  className: string;
  required: boolean;
  checked?: boolean;
  textArea?: boolean;
  type: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function Input({
  name,
  icon,
  labelText,
  placeholder,
  className,
  type,
  checked,
  textArea,
  required,
  value,
  onChange,
  onFocus,
  onBlur,
}: InputProps) {
  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    name,
    placeholder,
    className,
    type,
    checked,
    required,
    value,
    onChange,
    onFocus,
    onBlur,
  };

  if (type === "checkbox") {
    inputProps.checked = checked;
    return <input {...inputProps} style={{ display: "none" }} />;
  } else if (!textArea) {
    return (
      <>
        {labelText && (
          <label htmlFor={type} style={{ fontSize: "20px", fontWeight: "400" }}>
            {labelText}
          </label>
        )}
        {icon && labelText ? (
          <div
            style={{ marginTop: "8px", width: "440px" }}
            className="container-input"
          >
            <input {...inputProps} />
            <img src={icon} alt="Logo for Input" />
          </div>
        ) : (
          <>
            <input {...inputProps} />
            {icon && <img src={icon} alt="Logo for Input" />}
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        {labelText && (
          <label style={{ fontSize: "20px", fontWeight: "400" }} htmlFor={type}>
            {labelText}
          </label>
        )}
        <input {...inputProps} />
      </>
    );
  }
}
