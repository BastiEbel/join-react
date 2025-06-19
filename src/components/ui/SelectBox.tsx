import { ReactNode } from "react";

type SelectBoxProps = {
  children: ReactNode;
  labelText: ReactNode;
  className: string;
  text: string;
  id: string;
};

export default function SelectBox({
  children,
  labelText,
  className,
  text,
  id,
}: SelectBoxProps) {
  return (
    <div>
      <label id={id} style={{ fontSize: "20px", fontWeight: "400" }}>
        {labelText}
      </label>
      <select className={className} id={id} name={id}>
        <option>{text}</option>
        {children}
      </select>
    </div>
  );
}
