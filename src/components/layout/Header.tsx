import styles from "../css/Header.module.css";
import help from "../../assets/image/help.png";
import { useData } from "../../hooks/useData";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Header() {
  const { user, logout } = useData();
  const navigate = useNavigate();

  function getInitials(name: string) {
    const names = name.split(" ");
    return names.map((name) => name.charAt(0).toUpperCase()).join("");
  }

  async function onLogoutHandler() {
    toast.success("Logout successful", {
      position: "top-center",
      autoClose: 1000,
      onClose: async () => {
        navigate("/");
        await logout();
      },
    });
  }

  const intitials = user.name ? getInitials(user.name) : "";

  return (
    <header className={styles["containerHeader"]}>
      <ToastContainer hideProgressBar={true} closeButton={false} />
      <h1>Kanban Project Management</h1>
      <div className={styles["container-userInfo"]}>
        <img src={help} alt="need help" />
        <p>{intitials}</p>
        <Button onClick={onLogoutHandler} className={styles["fancy-button"]}>
          Logout
        </Button>
      </div>
    </header>
  );
}
