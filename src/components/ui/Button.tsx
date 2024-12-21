import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  className: string;
  href?: string;
  children: ReactNode;
  disabled?: boolean;
};

export default function Button({
  className,
  href,
  disabled,
  children,
}: ButtonProps) {
  const navigate = useNavigate();

  function onClickHandler() {
    if (href) {
      navigate(href);
    }
  }

  return (
    <button disabled={disabled} className={className} onClick={onClickHandler}>
      {children}
    </button>
  );
}
