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

interface AddOrEditProps {
  onClose: () => void;
}
function AddOrEdit({ onClose }: AddOrEditProps) {
  const [changeImage, setChangeImage] = useState<string>(clear);
  const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});

  function onCancelHandler() {
    onClose();
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
          <Button disabled className="add-contact-btn">
            Create contact
            <img src={check} alt="X" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddOrEdit;
