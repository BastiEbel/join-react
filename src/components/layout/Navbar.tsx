import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "../css/Navbar.css";
import profilLogo from "../../assets/image/joinLogoVector.png";
import DataProtection from "./DataProtection";

export default function Navbar() {
  const [nav, setNav] = useState<boolean>(false);

  function toggleNav() {
    setNav(!nav);
  }

  /* function closeNav() {
        setNav(false);
      } */
  return (
    <header className="navbar">
      <img src={profilLogo} alt="Logo Join" className="logo" />
      <ul className="nav-links">
        <li>
          <a href="">Summary</a>
        </li>
        <li>
          <a href="">Add Task</a>
        </li>
        <li>
          <a href="">Board</a>
        </li>
        <li>
          <a href="">Contacts</a>
        </li>
      </ul>
      <div onClick={toggleNav} className="menu-icon">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      <nav className={nav ? "nav-menu active" : "nav-menu"}>
        <ul>
          <li>
            <a href="">Summary</a>
          </li>
          <li>
            <a href="">Add Task</a>
          </li>
          <li>
            <a href="">Board</a>
          </li>
          <li>
            <a href="">Contacts</a>
          </li>
        </ul>
      </nav>
      <DataProtection />
    </header>
  );
}
