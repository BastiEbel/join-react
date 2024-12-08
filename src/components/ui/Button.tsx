import { useNavigate } from "react-router-dom";

type ButtonProps = {
  className: string;
  href: string;
  valueText: string;
};

export default function Button({ className, href, valueText }: ButtonProps) {
  const navigate = useNavigate();

  function onClickHandler() {
    navigate(href);
  }

  return (
    <button className={className} onClick={onClickHandler}>
      {valueText}
    </button>
  );
}
