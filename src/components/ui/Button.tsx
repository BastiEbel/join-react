import { CSSProperties, ReactNode } from "react";

type ButtonProps = {
  className: string;
  href?: string;
  children: ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  mouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  className,
  disabled,
  style,
  type,
  onClick,
  mouseOver,
  mouseLeave,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
      style={style}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
