import { ReactNode } from "react";

type SelectBoxProps = {
  children: ReactNode;
  labelText: ReactNode;
  value?: string;
  className: string;
  text: string;
  id: string;
  onChange?:
    | (() => void | undefined)
    | ((event: React.ChangeEvent<HTMLSelectElement>) => void);
};

export default function SelectBox({
  children,
  labelText,
  value,
  className,
  text,
  id,
  onChange,
}: SelectBoxProps) {
  return (
    <div>
      <label id={id} style={{ fontSize: "20px", fontWeight: "400" }}>
        {labelText}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={className}
        id={id}
        name={id}
      >
        <option>{text}</option>
        {children}
      </select>
    </div>
  );
}
