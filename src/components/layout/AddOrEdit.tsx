import joinLogoWhite from "../../assets/image/joinLogoVector.png";
import profilIcon from "../../assets/image/profil.png";
import clear from "../../assets/image/clear.png";
import check from "../../assets/image/check.png";
import hoverclear from "../../assets/image/hoverclear.png";
import peron from "../../assets/image/person.png";
import mail from "../../assets/image/mail.png";
import phone from "../../assets/image/call.png";
import "../css/AddOrEdit.css";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useState } from "react";
import { useData } from "../../hooks/useData";
import { ContactData } from "../../types/ContactData";

interface AddOrEditProps {
  onClose: () => void;
}
function AddOrEdit({ onClose }: AddOrEditProps) {
  const [changeImage, setChangeImage] = useState<string>(clear);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { setErrors } = useData();
  const [inputData, setInputData] = useState<ContactData>({
    userId: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
  const [buttonNane, setButtonName] = useState<string>("Create contact");

  function onCancelHandler() {
    onClose();
  }

  function validateName(name: string): boolean {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name);
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone: string): boolean {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone);
  }

  function validateForm() {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };

    if (!inputData.name) {
      newErrors.name = "Name is required";
    } else if (!validateName(inputData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    if (!inputData.email || !validateEmail(inputData.email)) {
      newErrors.email = "Email is required";
    }
    if (!inputData.phone || !validatePhone(inputData.phone)) {
      newErrors.phone = "Phone can only contain numbers";
    }

    setErrors(newErrors);
    setIsDisabled(Object.values(newErrors).some((error) => error !== ""));
    return Object.values(newErrors).every((error) => error === "");
  }

  function onContactHandler() {
    if (!validateForm()) {
      return;
    }
    setButtonName("Contact added");
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  }

  function onFocusHandler(name: string) {
    setIsFocused((prevFocused) => ({ ...prevFocused, [name]: true }));
  }

  function onBlurHandler(name: string) {
    setIsFocused((prevFocused) => ({ ...prevFocused, [name]: false }));
  }

  function onMouseOverHandler(e: React.MouseEvent<HTMLElement>) {
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.src = hoverclear;
    }
  }

  function onMouseLeaveHandler(e: React.MouseEvent<HTMLElement>) {
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.src = clear;
    }
  }

  return (
    <div className="container-addOrEdit">
      <div className="oversign">
        <img className="contact-logo" src={joinLogoWhite} alt="Join Logo" />
        <h1 className="title-name">Add Contact</h1>
        <p className="add-text">Task are better with a Team!</p>
        <div className="contact-spacer"></div>
      </div>
      <img className="profilImage" src={profilIcon} alt="Profil" />
      <img
        onClick={onCancelHandler}
        onMouseOver={() => setChangeImage(hoverclear)}
        onMouseLeave={() => setChangeImage(clear)}
        className="cancelImage"
        src={changeImage}
        alt="Close"
      />
      <div>
        <form className="form-contact" action="">
          {["name", "email", "phone"].map((field) => (
            <div
              key={field}
              className={`container-input ${isFocused[field] ? "focused" : ""}`}
            >
              <Input
                className="input-contact"
                icon={
                  field === "name" ? peron : field === "email" ? mail : phone
                }
                name={field}
                onChange={onInputChangeHandler}
                type={field === "email" ? "email" : "text"}
                onFocus={() => onFocusHandler(field)}
                onBlur={() => onBlurHandler(field)}
                required={field !== "phone"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            </div>
          ))}
        </form>
        <div className="container-btn">
          <Button
            mouseOver={(e) => onMouseOverHandler(e)}
            mouseLeave={(e) => onMouseLeaveHandler(e)}
            onClick={onCancelHandler}
            className="cancel-btn"
          >
            Cancel
            <img src={clear} alt="X" />
          </Button>
          <Button
            onClick={onContactHandler}
            disabled={isDisabled}
            className="add-contact-btn"
          >
            {buttonNane}
            <img src={check} alt="X" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddOrEdit;
