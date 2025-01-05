import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
  id?: string;
  icon?: string;
  labelText?: ReactNode;
  placeholder: string;
  className: string;
  required: boolean;
  checked?: boolean;
  textArea?: boolean;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  icon,
  labelText,
  placeholder,
  className,
  type,
  checked,
  textArea,
  required,
  onChange,
}: InputProps) {
  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    placeholder,
    id,
    type,
    required,
    onChange,
    className,
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
