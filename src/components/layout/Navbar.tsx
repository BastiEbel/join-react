import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "../css/Navbar.css";
import profilLogo from "../../assets/image/joinLogoVector.png";
import DataProtection from "./DataProtection";

export default function Navbar() {
  const [nav, setNav] = useState<boolean>(true);

  const navItems = [
    { name: "Summary", path: "/home/summary" },
    { name: "Add Task", path: "/home/addTask" },
    { name: "Board", path: "/home/board" },
    { name: "Contacts", path: "/home/contacts" },
  ];

  function toggleNav() {
    setNav(!nav);
  }

  /* function closeNav() {
        setNav(false);
      } */
  return (
    <>
      <div
        onClick={toggleNav}
        className={nav ? "menu-icon active" : "menu-icon"}
      >
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      <nav className={nav ? "nav-menu active" : "nav-menu"}>
        <div className="navbar">
          <img src={profilLogo} alt="Logo Join" className="logo" />
          {nav && (
            <ul>
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.path}>{item.name}</a>
                </li>
              ))}
            </ul>
          )}
          <DataProtection />
        </div>
      </nav>
    </>
  );
}
