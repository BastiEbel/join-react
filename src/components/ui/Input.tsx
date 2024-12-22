import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
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
      <div>
        {labelText && (
          <label style={{ fontSize: "20px", fontWeight: "400" }}>
            {labelText}
          </label>
        )}
        <input {...inputProps} />
        {icon && <img src={icon} alt="Logo for Input" />}
      </div>
    );
  } else {
    <div>
      {labelText && (
        <label style={{ fontSize: "20px", fontWeight: "400" }} htmlFor="text">
          {labelText}
        </label>
      )}
      <input {...inputProps} />
    </div>;
  }
}
