import { ReactNode } from "react";

type SelectBoxProps = {
  children: ReactNode;
  labelText: ReactNode;
  className: string;
  text: string;
};

export default function SelectBox({
  children,
  labelText,
  className,
  text,
}: SelectBoxProps) {
  return (
    <div>
      <label style={{ fontSize: "20px", fontWeight: "400" }}>{labelText}</label>
      <select className={className} id="select">
        <option>{text}</option>
        {children}
      </select>
    </div>
  );
}
