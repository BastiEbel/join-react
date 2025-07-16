import joinLogoWhite from "../../assets/image/joinLogoVector.png";
import profilIcon from "../../assets/image/profil.png";
import clear from "../../assets/image/clear.png";
import check from "../../assets/image/check.png";
import hoverclear from "../../assets/image/hoverclear.png";
import person from "../../assets/image/person.png";
import mail from "../../assets/image/mail.png";
import phone from "../../assets/image/call.png";
import styles from "../css/AddOrEdit.module.css";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useCallback, useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import { ContactData } from "../../types/ContactData";
import CountryCodeSelector from "../ui/CountryCodeSelector";
import { useParams } from "react-router-dom";
import { useContactValidation } from "../../hooks/useValidation";

interface AddOrEditProps {
  onClose: () => void;
  addContact: boolean;
  contactDataInfo?: ContactData;
}
function AddOrEdit({ onClose, addContact, contactDataInfo }: AddOrEditProps) {
  const { id } = useParams();
  const { addContactData, updateContactDataDB, setErrors, contactData } =
    useData();
  const [changeImage, setChangeImage] = useState<string>(clear);
  const [inputData, setInputData] = useState<ContactData>({
    userId: "",
    name: "",
    email: "",
    phone: "",
    zipCode: "+49",
  });
  const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
  const [buttonName, setButtonName] = useState<string>("");

  const { validateField, validateForm } = useContactValidation();

  useEffect(() => {
    setButtonName(addContact ? "Add Contact" : "Edit Contact");
    if (addContact) {
      setInputData({
        userId: id || "",
        name: "",
        email: "",
        phone: "",
        zipCode: "+49",
      });
    } else if (contactDataInfo) {
      setInputData({
        id: contactDataInfo.id,
        userId: contactDataInfo.userId,
        name: contactDataInfo.name,
        email: contactDataInfo.email,
        phone: contactDataInfo.phone,
        zipCode: contactDataInfo.zipCode,
      });
    }
  }, [addContact, contactDataInfo, id]);

  const onClearHandler = useCallback(() => {
    setInputData({
      userId: "",
      name: "",
      email: "",
      phone: "",
      zipCode: "+49",
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

  function getZipCodeHandler(code: string) {
    setInputData((prevData) => ({
      ...prevData,
      zipCode: code,
    }));
  }

  function onInputChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function onFocusHandler(name: string) {
    setIsFocused((prevFocused) => ({ ...prevFocused, [name]: true }));
  }

  function onBlurHandler(name: string) {
    setIsFocused((prevFocused) => ({ ...prevFocused, [name]: false }));
    setErrors({
      [name]: validateField(
        name as keyof ContactData,
        inputData[name as keyof ContactData] || ""
      ),
    });
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
    const { isValid, errors } = validateForm(inputData);
    setErrors(errors);
    if (!isValid) {
      return;
    }
    if (!id) {
      return;
    }
    if (addContact) {
      const exists = contactData.some(
        (contact) =>
          contact.userId === id &&
          contact.name === inputData.name &&
          contact.email === inputData.email &&
          contact.phone === inputData.phone &&
          contact.zipCode === inputData.zipCode
      );
      if (exists) {
        alert("Contact already exists.");
        return;
      }
      const newContact = {
        userId: id,
        name: inputData.name,
        email: inputData.email,
        phone: inputData.phone,
        zipCode: inputData.zipCode,
      };
      addContactData(newContact);
    } else {
      updateContactDataDB(inputData);
    }
    setButtonName("Contact added");
    onClearHandler();
    setTimeout(() => {
      onClose();
    }, 300);
  }

  return (
    <div className={styles["container-addOrEdit"]}>
      <div className={styles["oversign-addOrEdit"]}>
        <img
          className={styles["contact-logo"]}
          src={joinLogoWhite}
          alt="Join Logo"
        />
        <h1 className={styles["title-name"]}>
          {addContact ? "Add Contact" : "Edit Contact"}
        </h1>
        {addContact && (
          <p className={styles["add-text"]}>Task are better with a Team!</p>
        )}
        <div className={styles["contact-spacer"]}></div>
      </div>
      <img className={styles["profilImage"]} src={profilIcon} alt="Profil" />
      <img
        onClick={onCancelHandler}
        onMouseOver={() => setChangeImage(hoverclear)}
        onMouseLeave={() => setChangeImage(clear)}
        className={styles["cancelImage"]}
        src={changeImage}
        alt="Close"
      />
      <div>
        <form className={styles["form-contact"]} action="">
          {(["name", "email", "phone"] as Array<keyof ContactData>).map(
            (field) => (
              <div
                key={field}
                className={`${styles["container-input"]} ${
                  isFocused[field] ? "focused" : ""
                }`}
              >
                {field === "phone" && (
                  <CountryCodeSelector
                    zipCode={(code) => getZipCodeHandler(code)}
                    value={inputData.zipCode || "+49"}
                  />
                )}
                <Input
                  className={styles["input-contact"]}
                  icon={
                    field === "name"
                      ? person
                      : field === "email"
                      ? mail
                      : field === "phone"
                      ? phone
                      : undefined
                  }
                  name={field}
                  onChange={onInputChangeHandler}
                  type={field === "email" ? "email" : "text"}
                  onFocus={() => onFocusHandler(field)}
                  onBlur={() => onBlurHandler(field)}
                  required={field !== "phone"}
                  value={inputData[field] || ""}
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
        <div className={styles["container-btn"]}>
          <Button
            mouseOver={(e) => onMouseOverHandler(e)}
            mouseLeave={(e) => onMouseLeaveHandler(e)}
            onClick={onCancelHandler}
            className={styles["cancel-btn"]}
          >
            Cancel
            <img src={clear} alt="X" />
          </Button>
          <Button
            onClick={onAddContactHandler}
            className={styles["add-contact-btn"]}
          >
            {buttonName}
            <img src={check} alt="X" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddOrEdit;
