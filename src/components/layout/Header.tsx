import "../css/Header.css";
import help from "../../assets/image/help.png";

export default function Header() {
  return (
    <header>
      <h1>Kanban Project Management</h1>
      <div className="container-userInfo">
        <img src={help} alt="need help" />
        <p>SE</p>
      </div>
    </header>
  );
}
