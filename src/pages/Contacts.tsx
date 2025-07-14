import styles from "../components/css/Contact.module.css";
import Button from "../components/ui/Button";
import imgContact from "../assets/image/person_add.png";
import { useEffect, useRef, useState } from "react";
import OpenModal, { ModalHandle } from "../components/ui/OpenModal";
import AddOrEditContact from "../components/layout/AddOrEditContact";
import { ContactData } from "../types/ContactData";
import { useData } from "../hooks/useData";
import ContactInfo from "../components/layout/ContactInfo";
import ContactList from "../components/layout/ContactList";

export default function Contacts() {
  const dialogRef = useRef<ModalHandle>(null);

  const { loadContactData, contactData } = useData();
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(
    contactData[0] || null
  );

  useEffect(() => {
    loadContactData();
  }, [loadContactData, contactData]);

  function onAddPersonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }

  function onCloseHandler() {
    if (dialogRef.current) {
      dialogRef.current.close();
      loadContactData();
    }
  }

  function onContactClickHandler(contact: ContactData) {
    setSelectedContact(contact);
  }

  return (
    <>
      <OpenModal ref={dialogRef}>
        <AddOrEditContact onClose={onCloseHandler} addContact={true} />
      </OpenModal>
      <div className={styles["container-contacts"]}>
        <nav className={styles["nav-contacts"]}>
          <Button
            onClick={onAddPersonHandler}
            className={styles["btn-addPerson"]}
          >
            Add new contact <img src={imgContact} alt="Add Person" />
          </Button>

          {contactData && contactData.length > 0 ? (
            <ContactList
              contacts={contactData}
              onContactClick={onContactClickHandler}
            />
          ) : (
            <p>No contact data found</p>
          )}
        </nav>
        <div className={styles["container-contact-info"]}>
          <div className={styles["contact-info"]}>
            <h1>Contacts</h1>
            <div></div>
            <h2>Better with a team</h2>
          </div>
          <div className={styles["contact-info-text"]}>
            {selectedContact ? (
              <ContactInfo
                contactInfo={selectedContact as ContactData}
                onDelete={() => setSelectedContact(null)}
              />
            ) : (
              <p
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "lightgray",
                  marginTop: "128px",
                }}
              >
                Select a person to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
