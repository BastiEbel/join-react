import contactColors from "../../styles/contactColors";
import "../css/ContactList.css";

interface Contact {
  userId: string;
  name: string;
  email: string;
}

interface ContactListProps {
  contacts: Contact[];
  onContactClick: (contact: Contact) => void;
}

export default function ContactList({
  contacts,
  onContactClick,
}: ContactListProps) {
  const alphabet = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 65)
  );
  console.log("Contacts:", contacts);

  return (
    <>
      {alphabet
        .filter((letter) =>
          contacts.some(
            (contact) => contact.name && contact.name.startsWith(letter)
          )
        )
        .map((letter) => (
          <div key={letter} className="alphabet">
            <span className="alphabet-letter">{letter}</span>
            <div>
              {contacts
                .filter((contact) => contact.name.startsWith(letter))
                .map((contact) => {
                  const initialsContact = contact.name
                    .split(" ")
                    .map((name) => name.charAt(0))
                    .join("");
                  const letter = initialsContact.charAt(0).toUpperCase();
                  return (
                    <div
                      onClick={() => onContactClick(contact)}
                      key={contact.email}
                      className="contact"
                    >
                      <div
                        className="contact-item"
                        style={{
                          backgroundColor: contactColors[letter],
                        }}
                      >
                        {initialsContact}
                      </div>
                      <span>
                        {contact.name} <p>{contact.email}</p>
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
    </>
  );
}
