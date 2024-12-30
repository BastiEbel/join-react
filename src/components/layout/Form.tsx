import "../css/Form.css";
import Input from "../ui/Input";
import person from "../../assets/image/person.png";
import mail from "../../assets/image/mail.png";
import lock from "../../assets/image/lock.png";
import leftArrow from "../../assets/image/arrowLeft.png";
import Button from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

type FormProps = {
  oversign: string;
  isLogIn: boolean;
};

export default function Form({ oversign, isLogIn }: FormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
  }

  const inputProps = [
    {
      icon: person,
      placeholder: "Name",
      type: "text",
    },
    {
      icon: mail,
      placeholder: "Email",
      type: "email",
    },
    {
      icon: lock,
      placeholder: "Password",
      type: "password",
    },
    {
      icon: lock,
      placeholder: "Confirm Password",
      type: "password",
    },
  ];

  function onClickBackHandler() {
    navigate("/");
  }

  function onClickLoginHandler() {}
  return (
    <form className="form-signIn" action="">
      {!isLogIn && (
        <img
          onClick={onClickBackHandler}
          className="arrow-left"
          src={leftArrow}
          alt="left arrow"
        />
      )}
      <div className="container-oversign">
        <h1>{oversign}</h1>
        <div className="vector"></div>
      </div>
      <div className="container-inputs">
        {inputProps
          .filter((inputProp) =>
            isLogIn
              ? inputProp.placeholder === "Email" ||
                inputProp.placeholder === "Password"
              : true
          )
          .map((inputProp) => (
            <div
              key={inputProp.placeholder}
              className={`container-input ${
                location.pathname === "/" && isLogIn ? "d-none" : ""
              }`}
            >
              <Input
                id={inputProp.placeholder}
                className="input-signIn"
                required
                placeholder={inputProp.placeholder}
                type={inputProp.type}
                icon={inputProp.icon}
              />
            </div>
          ))}
      </div>
      <div className="container-btn">
        {isLogIn ? (
          <>
            <Button
              onClick={onClickLoginHandler}
              disabled={!isChecked}
              className="btn-login"
            >
              Log in
            </Button>
            <Button
              onClick={onClickLoginHandler}
              disabled={!isChecked}
              className="btn-guest"
            >
              Guest Log in
            </Button>
          </>
        ) : (
          <div className="container-signUp">
            <span className="police">
              <label className="custom-checkbox">
                <Input
                  className="input"
                  required={false}
                  placeholder=""
                  checked={isChecked}
                  onChange={onChangeHandler}
                  type="checkbox"
                />
                <span className="checkmark"></span>
              </label>
              <p>
                <span>
                  I accept the&nbsp;
                  <a href="">Privacy police</a>
                </span>
              </p>
            </span>
            <Button
              onClick={onClickLoginHandler}
              disabled={!isChecked}
              className="btn-login"
              href=""
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
