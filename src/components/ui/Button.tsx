import { CSSProperties, ReactNode } from "react";

type ButtonProps = {
  className: string;
  href?: string;
  children: ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
  onClick: () => void;
};

export default function Button({
  className,
  disabled,
  style,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      style={style}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
