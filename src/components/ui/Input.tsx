import { ChangeEvent, InputHTMLAttributes } from "react";

type InputProps = {
  icon?: string;
  labelText?: string;
  placeholder: string;
  className: string;
  required: boolean;
  checked?: boolean;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  icon,
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
      <>
        {labelText && <label htmlFor={labelText}>{labelText}</label>}
        <input {...inputProps} />
        {icon && <img src={icon} alt="Logo for Input" />}
      </>
    );
  }
}
