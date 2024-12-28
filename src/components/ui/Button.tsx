import { CSSProperties, ReactNode } from "react";

type ButtonProps = {
  className: string;
  href?: string;
  children: ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
  onClick: () => void;
  mouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  className,
  disabled,
  style,
  onClick,
  mouseOver,
  mouseLeave,
  children,
}: ButtonProps) {
  return (
    <button
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
