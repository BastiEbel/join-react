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
import { useCallback, useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import { ContactData } from "../../types/ContactData";
import CountryCodeSelector from "../ui/CountryCodeSelector";
import { useParams } from "react-router-dom";

interface AddOrEditProps {
  onClose: () => void;
  addContact: boolean;
}
function AddOrEdit({ onClose, addContact }: AddOrEditProps) {
  const { id } = useParams();
  const [changeImage, setChangeImage] = useState<string>(clear);
  const { setErrors } = useData();
  const [inputData, setInputData] = useState<ContactData>({
    userId: "",
    name: "",
    email: "",
    phone: "",
  });
  const [countryCode, setCountryCode] = useState<string>("+49");
  const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
  const [buttonNane, setButtonName] = useState<string>("");

  useEffect(() => {
    setButtonName(addContact ? "Add Contact" : "Edit Contact");
    if (addContact) {
      setCountryCode("+49");
    }
  }, [addContact]);

  const onClearHandler = useCallback(() => {
    setInputData({
      userId: "",
      name: "",
      email: "",
      phone: "",
    });
    setIsFocused({});
    setErrors({
      name: "",
      email: "",
      phone: "",
    });
    setChangeImage(clear);
    setButtonName("Add Contact");
  }, [setErrors]);

  function onCancelHandler() {
    onClearHandler();
    onClose();
  }

  const validateField = useCallback(
    (field: keyof ContactData, value: string): string => {
      switch (field) {
        case "name":
          return /^[a-zA-Z\s]*$/.test(value)
            ? ""
            : "Name can only contain letters and spaces";
        case "email":
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email format";
        case "phone":
          return /^\d+$/.test(value) ? "" : "Phone can only contain numbers";
        default:
          return "";
      }
    },
    []
  );

  function getZipCodeHandler(code: string) {
    if (code !== countryCode) {
      setCountryCode(code);
    }
  }

  const validateForm = useCallback(() => {
    const newErrors = {
      name: validateField("name", inputData.name),
      email: validateField("email", inputData.email),
      phone: validateField("phone", inputData.phone || ""),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  }, [inputData, setErrors, validateField]);

  function onInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "phone") {
      setInputData((prevPhone) => ({
        ...prevPhone,
        phone: value,
      }));
    } else {
      setInputData((prevData) => ({ ...prevData, [name]: value }));
    }
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

  function onAddContactHandler() {
    if (!validateForm()) {
      return;
    }

    const newContact = {
      userId: id,
      name: inputData.name,
      email: inputData.email,
      phone: `${countryCode}${inputData.phone}`,
    };

    console.log("New contact:", newContact);

    setButtonName("Contact added");
    onClearHandler();
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <div className="container-addOrEdit">
      <div className="oversign">
        <img className="contact-logo" src={joinLogoWhite} alt="Join Logo" />
        <h1 className="title-name">
          {addContact ? "Add Contact" : "Edit Contact"}
        </h1>
        {addContact && <p className="add-text">Task are better with a Team!</p>}
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
          {(["name", "email", "phone"] as Array<keyof ContactData>).map(
            (field) => (
              <div
                key={field}
                className={`container-input ${
                  isFocused[field] ? "focused" : ""
                }`}
              >
                {field === "phone" && (
                  <CountryCodeSelector
                    zipCode={(code) => getZipCodeHandler(code)}
                  />
                )}
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
                  value={inputData[field]}
                  placeholder={
                    field === "phone"
                      ? "170 1234567"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                />
              </div>
            )
          )}
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
          <Button onClick={onAddContactHandler} className="add-contact-btn">
            {buttonNane}
            <img src={check} alt="X" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddOrEdit;
