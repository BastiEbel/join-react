import "../css/Header.css";
import help from "../../assets/image/help.png";
import { useData } from "../../hooks/useData";

export default function Header() {
  const { user } = useData();

  function getInitials(name: string) {
    const names = name.split(" ");
    return names.map((name) => name.charAt(0).toUpperCase()).join("");
  }

  const intitials = user.name ? getInitials(user.name) : "";

  return (
    <header className="containerHeader">
      <h1>Kanban Project Management</h1>
      <div className="container-userInfo">
        <img src={help} alt="need help" />
        <p>{intitials}</p>
      </div>
    </header>
  );
}
