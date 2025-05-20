import contactColors from "../../styles/contactColors";
import edit from "../../assets/image/edit.png";
import deleteItem from "../../assets/image/delete.png";
import "../css/ContactInfo.css";
import OpenModal, { ModalHandle } from "../ui/OpenModal";
import { useRef } from "react";
import InformationBox from "../ui/InformationBox";
import { ContactData } from "../../types/ContactData";

interface ContactInfoProps {
  contactInfo: ContactData;
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  const dialogRef = useRef<ModalHandle>(null);
  const initialsContact = contactInfo.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  function onEditHandler() {
    // Logic to edit the contact
  }
  function onOpenDeleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }
  function onDeleteHandler(contactData: ContactData) {
    console.log("Delete contact", contactData);

    // Logic to delete the contact
  }

  return (
    <>
      <OpenModal ref={dialogRef}>
        <InformationBox
          onClose={() => {
            if (dialogRef.current) {
              dialogRef.current.close();
            }
          }}
          title="Delete Contact"
          description="You are sure do you want delete the contact?"
          info={contactInfo}
          btnName="Delete"
          onClick={() => onDeleteHandler(contactInfo)}
        />
      </OpenModal>
      <div className="name-container">
        <div
          className="name-item"
          style={{
            backgroundColor:
              contactColors[initialsContact.charAt(0).toUpperCase()],
          }}
        >
          {initialsContact}
        </div>
        <div className="name-info">
          <h1>{contactInfo.name}</h1>
          <div className="name-info-btn">
            <span onClick={onEditHandler}>
              <img src={edit} alt="Edit Contact" />
              Edit
            </span>
            <span onClick={onOpenDeleteHandler}>
              <img src={deleteItem} alt="Delete Contact" />
              Delete
            </span>
          </div>
        </div>
      </div>
      <div className="name-info-line">
        <h2>Contact Information</h2>
        <span>
          <b>Email:</b>
          <p style={{ color: "blue" }}>{contactInfo.email}</p>
        </span>
        <span>
          <b>Phone:</b>
          <p>{contactInfo.phone}</p>
        </span>
      </div>
    </>
  );
}
