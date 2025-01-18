import "../css/Form.css";
import Input from "../ui/Input";
import personIcon from "../../assets/image/person.png";
import mailIcon from "../../assets/image/mail.png";
import lockIcon from "../../assets/image/lock.png";
import leftArrowIcon from "../../assets/image/arrowLeft.png";
import Button from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useState } from "react";
import { useData } from "../../hooks/useData";
import { FormData } from "../../store/dataSlice";

type FormProps = {
  oversign: string;
  isLogIn: boolean;
};

type InputProp = {
  icon: string;
  placeholder: string;
  type: string;
  name: string;
  error?: string;
};

export default function Form({ oversign, isLogIn }: FormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { errors, signUp, setErrors, login } = useData();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [inputData, setInputData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  }

  const inputFields: InputProp[] = [
    {
      icon: personIcon,
      placeholder: "Name",
      type: "text",
      name: "name",
      error: errors.name,
    },
    {
      icon: mailIcon,
      placeholder: "Email",
      type: "email",
      name: "email",
      error: errors.email,
    },
    {
      icon: lockIcon,
      placeholder: "Password",
      type: "password",
      name: "password",
      error: errors.password,
    },
    {
      icon: lockIcon,
      placeholder: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      error: errors.confirmPassword,
    },
  ];

  function onClickBackHandler() {
    navigate("/");
  }

  function validateForm() {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!isLogIn && !inputData.name) {
      newErrors.name = "Name is required";
    }
    if (!inputData.email) {
      newErrors.email = "Email is required";
    }
    if (!inputData.password) {
      newErrors.password = "Password is required";
    }
    if (!isLogIn && inputData.password !== inputData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  }

  async function onSubmittingHandler(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (!isLogIn) {
      try {
        const response = await signUp(inputData);
        if (response) {
          const userId = response.userId;
          navigate(`/summary/${userId}`);
        }
      } catch (error) {
        console.error("Sign up failed:", error);
      }
    } else {
      try {
        const response = await login({
          email: inputData.email,
          password: inputData.password,
        });
        console.log(response);

        if (response) {
          const userId = response.userId;
          navigate(`/summary/${userId}`);
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  }
  return (
    <form className="form-signIn" onSubmit={onSubmittingHandler} action="">
      {!isLogIn && (
        <img
          onClick={onClickBackHandler}
          className="arrow-left"
          src={leftArrowIcon}
          alt="left arrow"
        />
      )}
      <div className="container-oversign">
        <h1>{oversign}</h1>
        <div className="vector"></div>
      </div>
      <div className="container-inputs">
        {inputFields
          .filter((inputProp) =>
            isLogIn
              ? inputProp.placeholder === "Email" ||
                inputProp.placeholder === "Password"
              : true
          )
          .map((inputProp) => (
            <div key={inputProp.name}>
              <div
                className={`container-input ${
                  location.pathname === "/" && isLogIn ? "d-none" : ""
                }`}
              >
                <Input
                  className="input-signIn"
                  name={inputProp.name}
                  required
                  placeholder={inputProp.placeholder}
                  type={inputProp.type}
                  icon={inputProp.icon}
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
              {inputProp.error && (
                <span className="error">{inputProp.error}</span>
              )}
            </div>
          ))}
      </div>
      <div className="container-btn">
        {isLogIn ? (
          <>
            <Button className="btn-login">Log in</Button>
            <Button className="btn-guest">Guest Log in</Button>
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
                  onChange={(e) => setIsChecked(e.target.checked)}
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
            <Button type="submit" disabled={!isChecked} className="btn-login">
              Sign up
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
