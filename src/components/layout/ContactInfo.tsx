import contactColors from "../../styles/contactColors";
import edit from "../../assets/image/edit.png";
import deleteItem from "../../assets/image/delete.png";
import "../css/ContactInfo.css";

interface ContactInfoProps {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  const initialsContact = contactInfo.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  function onEditHandler() {
    // Logic to edit the contact
  }
  function onDeleteHandler() {
    // Logic to delete the contact
  }

  return (
    <>
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
            <span onClick={onDeleteHandler}>
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
