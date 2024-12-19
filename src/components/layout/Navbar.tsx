import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "../css/Navbar.css";
import profilLogo from "../../assets/image/joinLogoVector.png";
import summary from "../../assets/image/summary.png";
import addTask from "../../assets/image/addTask.png";
import board from "../../assets/image/board.png";
import contacts from "../../assets/image/contacts.png";
import DataProtection from "./DataProtection";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [nav, setNav] = useState<boolean>(true);
  const location = useLocation();

  const navItems = [
    { name: "Summary", path: "/home/summary", img: summary },
    { name: "Add Task", path: "/home/addTask", img: addTask },
    { name: "Board", path: "/home/board", img: board },
    { name: "Contacts", path: "/home/contacts", img: contacts },
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
          <img
            style={{ width: "auto", height: "auto" }}
            src={profilLogo}
            alt="Logo Join"
            className="logo"
          />
          {nav && (
            <ul>
              {navItems.map((item) => (
                <li
                  className={
                    location.pathname === item.path ? "selectedBG" : ""
                  }
                  key={item.name}
                >
                  <img src={item.img} alt={item.name} />
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
