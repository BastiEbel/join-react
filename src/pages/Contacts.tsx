import "../components/css/Contact.css";
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
    if (contactData && contactData.length > 0) {
      setSelectedContact(contactData[0]);
    }
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
      <div className="container-contacts">
        <nav className="nav-contacts">
          <Button onClick={onAddPersonHandler} className="btn-addPerson">
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
        <div className="container-contact-info">
          <div className="contact-info">
            <h1>Contacts</h1>
            <div></div>
            <h2>Better with a team</h2>
          </div>
          <div className="contact-info-text">
            {selectedContact ? (
              <ContactInfo contactInfo={selectedContact as ContactData} />
            ) : (
              <p>Select a person to view details</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
