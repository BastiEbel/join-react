import contactColors from "../../styles/contactColors";
import edit from "../../assets/image/edit.png";
import deleteItem from "../../assets/image/delete.png";
import styles from "../css/ContactInfo.module.css";
import OpenModal, { ModalHandle } from "../ui/OpenModal";
import React, { useRef, useState } from "react";
import InformationBox from "../ui/InformationBox";
import { ContactData } from "../../types/ContactData";
import { useData } from "../../hooks/useData";
import { deleteContactToDB } from "../../utils/contactData";
import AddOrEdit from "./AddOrEditContact";

interface ContactInfoProps {
  contactInfo: ContactData;
  onDelete?: () => void;
}

export default function ContactInfo({
  contactInfo,
  onDelete,
}: ContactInfoProps) {
  const dialogRef = useRef<ModalHandle>(null);
  const [onEditMode, setOnEditMode] = useState(false);
  const [contactData, setContactData] = useState<ContactData>(contactInfo);
  const { loadContactData } = useData();
  const initialsContact = contactInfo.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  function onEditHandler(contact: ContactData) {
    setOnEditMode(true);
    if (dialogRef.current) {
      dialogRef.current.open();
    }
    setContactData(contact);
  }
  function onOpenDeleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }
  function onCloseEditHandler() {
    setOnEditMode(false);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }
  function onDeleteHandler(contactData: ContactData) {
    if (!contactData.id) {
      alert("Contact did not found.");
      return;
    }
    deleteContactToDB(contactData.id);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    loadContactData();
    setOnEditMode(false);
    if (onDelete) onDelete();
  }

  return (
    <>
      <OpenModal ref={dialogRef}>
        {onEditMode ? (
          <AddOrEdit
            contactData={contactData}
            onClose={onCloseEditHandler}
            addContact={false}
          />
        ) : (
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
        )}
      </OpenModal>
      <div className={styles["name-container"]}>
        <div
          className={styles["name-item"]}
          style={{
            backgroundColor:
              contactColors[initialsContact.charAt(0).toUpperCase()],
          }}
        >
          {initialsContact}
        </div>
        <div className={styles["name-info"]}>
          <h1>{contactInfo.name}</h1>
          <div className={styles["name-info-btn"]}>
            <span onClick={() => onEditHandler(contactInfo)}>
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
      <div className={styles["name-info-line"]}>
        <h2>Contact Information</h2>
        <span>
          <b>Email:</b>
          <p style={{ color: "blue" }}>{contactInfo.email}</p>
        </span>
        <span>
          <b>Phone:</b>
          <p>
            {contactInfo.zipCode}
            {contactInfo.phone}
          </p>
        </span>
      </div>
    </>
  );
}
