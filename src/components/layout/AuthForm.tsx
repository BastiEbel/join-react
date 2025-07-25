import { useLocation, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";

import styles from "../css/AuthForm.module.css";
import Input from "../ui/Input";
import personIcon from "../../assets/image/person.png";
import mailIcon from "../../assets/image/mail.png";
import lockIcon from "../../assets/image/lock.png";
import leftArrowIcon from "../../assets/image/arrowLeft.png";
import Button from "../ui/Button";

import { useData } from "../../hooks/useData";
import { useAuthValidation } from "../../hooks/useAuthValidation";
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
  const { validateField, validateForm } = useAuthValidation(isLogIn);
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
    setErrors({
      [name]: validateField(
        name as keyof FormData,
        inputData[name as keyof FormData] || "",
        inputData
      ),
    });
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

  async function onSubmittingHandler(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    const { isValid, errors } = validateForm(inputData);
    setErrors(errors);
    if (!isValid) {
      toast.error("Please fill in all required fields correctly.", {
        autoClose: 3000,
      });
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
      <form
        className={styles["form-signIn"]}
        onSubmit={onSubmittingHandler}
        action=""
      >
        {!isLogIn && (
          <img
            onClick={onClickBackHandler}
            className={styles["arrow-left"]}
            src={leftArrowIcon}
            alt="left arrow"
          />
        )}
        <div className={styles["container-oversign"]}>
          <h1>{oversign}</h1>
          <div className={styles["vector"]}></div>
        </div>
        <div className={styles["container-inputs"]}>
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
                  className={`${styles["container-input"]} ${
                    inputProp.error ? styles["error-input"] : ""
                  } ${isFocused[inputProp.name] ? styles["focused"] : ""} ${
                    location.pathname === "/" && isLogIn ? styles["d-none"] : ""
                  }`}
                >
                  <Input
                    className={styles["input-signIn"]}
                    name={inputProp.name}
                    required
                    placeholder={inputProp.placeholder}
                    type={inputProp.type}
                    icon={inputProp.icon}
                    onChange={(e) => {
                      if (e.target instanceof HTMLInputElement) {
                        onChangeHandler(
                          e as React.ChangeEvent<HTMLInputElement>
                        );
                      }
                    }}
                    onFocus={() => handleFocus(inputProp.name)}
                    onBlur={() => handleBlur(inputProp.name)}
                  />
                </div>
                {inputProp.error && (
                  <span className={styles["error"]}>{inputProp.error}</span>
                )}
              </div>
            ))}
        </div>
        <div className={styles["container-btn"]}>
          {isLogIn ? (
            <>
              <Button className={styles["btn-login"]}>Log in</Button>
              <Button className={styles["btn-guest"]}>Guest Log in</Button>
            </>
          ) : (
            <div className={styles["container-signUp"]}>
              <span className={styles["police"]}>
                <label className={styles["custom-checkbox"]}>
                  <Input
                    className={styles["input"]}
                    required={false}
                    placeholder=""
                    checked={isChecked}
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      if (e.target instanceof HTMLInputElement) {
                        setIsChecked(e.target.checked);
                      }
                    }}
                    type="checkbox"
                  />
                  <span className={styles["checkmark"]}></span>
                </label>
                <p>
                  <span>
                    I accept the&nbsp;
                    <a href="">Privacy police</a>
                  </span>
                </p>
              </span>
              <Button
                type="submit"
                disabled={!isChecked}
                className={styles["btn-login"]}
              >
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
