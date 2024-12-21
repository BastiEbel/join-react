import { ChangeEvent, InputHTMLAttributes } from "react";
import "../css/Input.css";

type InputProps = {
  logoPath?: string;
  labelText?: string;
  placeholder: string;
  className: string;
  required: boolean;
  checked?: boolean;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  logoPath,
  labelText,
  placeholder,
  className,
  type,
  checked,
  required,
  onChange,
}: InputProps) {
  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    placeholder,
    type,
    required,
    onChange,
    className,
  };

  if (type === "checkbox") {
    inputProps.checked = checked;
    return <input {...inputProps} style={{ display: "none" }} />;
  } else {
    return (
      <div className="container-input">
        {labelText && <label htmlFor={labelText}>{labelText}</label>}
        <input {...inputProps} />
        {logoPath && <img src={logoPath} alt="Logo for Input" />}
      </div>
    );
  }
}
