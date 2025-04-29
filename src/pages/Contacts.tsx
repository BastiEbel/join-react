import "../components/css/Contact.css";
import Button from "../components/ui/Button";
import imgContact from "../assets/image/person_add.png";
import { useEffect, useRef } from "react";
import OpenModal, { ModalHandle } from "../components/ui/OpenModal";
import AddOrEditContact from "../components/layout/AddOrEditContact";
import { ContactData } from "../types/ContactData";
import { useData } from "../hooks/useData";

export default function Contacts() {
  const dialogRef = useRef<ModalHandle>(null);
  const alphabet = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 65)
  );
  const { loadContactData, contactData } = useData();

  useEffect(() => {
    loadContactData();
  }, [loadContactData]);

  function onAddPersonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }

  function onCloseHandler() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
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

          {contactData && Object.keys(contactData).length > 0 ? (
            alphabet.map((letter) => (
              <div key={letter} className="alphabet">
                <span className="alphabet-letter">{letter}</span>
                {
                  <div>
                    {Object.values(contactData)
                      .filter(
                        (contact: ContactData) =>
                          contact &&
                          contact.name &&
                          contact.name.startsWith(letter)
                      )
                      .map((contact) => (
                        <div key={contact.id}>
                          <p>{contact.name}</p>
                          <p>{contact.email}</p>
                          <p>{contact.phone}</p>
                        </div>
                      ))}
                  </div>
                }
              </div>
            ))
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
        </div>
      </div>
    </>
  );
}
