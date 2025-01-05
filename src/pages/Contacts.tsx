import "../components/css/Contact.css";
import Button from "../components/ui/Button";
import imgContact from "../assets/image/person_add.png";

export default function Contacts() {
  const alphabet = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 65)
  );
  function onAddPersonHandler() {}
  return (
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
  );
}
