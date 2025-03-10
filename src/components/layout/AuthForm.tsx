import { useLocation, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";

import "../css/AuthForm.css";
import Input from "../ui/Input";
import personIcon from "../../assets/image/person.png";
import mailIcon from "../../assets/image/mail.png";
import lockIcon from "../../assets/image/lock.png";
import leftArrowIcon from "../../assets/image/arrowLeft.png";
import Button from "../ui/Button";

import { useData } from "../../hooks/useData";
import { FormData } from "../../types/FormData";

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
  const { errors, signUp, setErrors, login, authentication } = useData();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
  const [inputData, setInputData] = useState<FormData>({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleFocus(name: string) {
    setIsFocused((prev) => ({ ...prev, [name]: true }));
  }

  function handleBlur(name: string) {
    setIsFocused((prev) => ({ ...prev, [name]: false }));
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

  function validateName(name: string): boolean {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name);
  }
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password: string): boolean {
    return password.length >= 8;
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
    } else if (!validateName(inputData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    if (!inputData.email || !validateEmail(inputData.email)) {
      newErrors.email = "Email is required";
    }
    if (!inputData.password || !validatePassword(inputData.password)) {
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

    const sanitizedInputData = {
      ...inputData,
      name: DOMPurify.sanitize(inputData.name),
      email: DOMPurify.sanitize(inputData.email),
      password: DOMPurify.sanitize(inputData.password),
      confirmPassword: DOMPurify.sanitize(inputData.confirmPassword),
    };

    try {
      const response = isLogIn
        ? await login({
            email: sanitizedInputData.email,
            password: sanitizedInputData.password,
          })
        : await signUp(sanitizedInputData);

      if (response) {
        const responseUser = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          isAuthenticated: true,
        };
        authentication(responseUser);

        toast.success(`Welcome ${responseUser.name}!`, {
          autoClose: 1000,
          onClose: () => {
            navigate(`/summary/${response.id}`);
          },
        });
      }
    } catch (error) {
      if (error) {
        const errorMessage = isLogIn
          ? "Login failed. Please check your login details."
          : "Registration failed. Please try again.";

        toast.error(errorMessage, {
          autoClose: 5000,
        });
      }
    }
  }
  return (
    <>
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
                    inputProp.error ? "error-input" : ""
                  } ${isFocused[inputProp.name] ? "focused" : ""} ${
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
                    onFocus={() => handleFocus(inputProp.name)}
                    onBlur={() => handleBlur(inputProp.name)}
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
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        closeButton={false}
      />
    </>
  );
}
