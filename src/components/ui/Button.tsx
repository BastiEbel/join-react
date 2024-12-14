import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  className: string;
  href: string;
  children: ReactNode;
};

export default function Button({ className, href, children }: ButtonProps) {
  const navigate = useNavigate();

  function onClickHandler() {
    navigate(href);
  }

  return (
    <button className={className} onClick={onClickHandler}>
      {children}
    </button>
  );
}
