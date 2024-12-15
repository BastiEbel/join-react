import "../css/Form.css";
import Input from "../ui/Input";
import person from "../../assets/image/person.png";
import mail from "../../assets/image/mail.png";
import lock from "../../assets/image/lock.png";
import leftArrow from "../../assets/image/arrowLeft.png";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

type FormProps = {
  oversign: string;
  isLogIn: boolean;
};

export default function Form({ oversign, isLogIn }: FormProps) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    setDisabled(!isChecked);
  }

  function onClickBackHandler() {
    navigate("/");
  }
  return (
    <form action="">
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
        {!isLogIn && (
          <Input
            className=""
            logoPath={person}
            placeholder="Name"
            type="text"
            required={true}
          />
        )}
        <Input
          className=""
          logoPath={mail}
          placeholder="Email"
          type="email"
          required={true}
        />
        <Input
          className=""
          logoPath={lock}
          placeholder="Password"
          type="password"
          required={true}
        />
        {!isLogIn && (
          <Input
            className=""
            logoPath={lock}
            placeholder="Confirm Password"
            type="password"
            required={true}
          />
        )}
      </div>
      <div className="container-btn">
        {isLogIn ? (
          <>
            <Button disabled={false} className="btn-login" href="">
              Log in
            </Button>
            <Button disabled={false} className="btn-guest" href="">
              Guest Log in
            </Button>
          </>
        ) : (
          <div className="container-signUp">
            <span className="police">
              <label className="custom-checkbox">
                <Input
                  className="input"
                  logoPath=""
                  required={false}
                  placeholder=""
                  checked={checked}
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
            <Button disabled={disabled} className="btn-login" href="">
              Sign up
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
