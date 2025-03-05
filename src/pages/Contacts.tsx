import "../components/css/Contact.css";
import Button from "../components/ui/Button";
import imgContact from "../assets/image/person_add.png";
import { useRef } from "react";
import OpenModal, { ModalHandle } from "../components/ui/OpenModal";
import AddOrEdit from "../components/layout/AddOrEdit";

export default function Contacts() {
  const dialogRef = useRef<ModalHandle>(null);
  const alphabet = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 65)
  );

  function onAddPersonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }

  function onCloseHandler() {
    if (dialogRef.current) {
      return dialogRef.current.close();
    }
  }
  return (
    <>
      <OpenModal ref={dialogRef}>
        <AddOrEdit onClose={onCloseHandler} />
      </OpenModal>
      <div className="container-contacts">
        <nav className="nav-contacts">
          <Button onClick={onAddPersonHandler} className="btn-addPerson">
            Add new contact <img src={imgContact} alt="Add Person" />
          </Button>

          {alphabet.map((letter) => (
            <div key={letter} className="alphabet">
              <span className="alphabet-letter">{letter}</span>
            </div>
          ))}
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
