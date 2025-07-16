import logo from "../assets/image/joinLogo.png";
import Button from "../components/ui/Button";
import styles from "../components/css/Login.module.css";
import AuthForm from "../components/layout/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function onClickHandler() {
    navigate("/signup");
  }
  return (
    <main className={styles["login-main"]}>
      <div>
        <img className={styles["logo-img"]} src={logo} alt="Logo Image" />
        <div className={styles["container-signup"]}>
          <p>Not a Join user?</p>
          <Button
            disabled={false}
            onClick={onClickHandler}
            className={styles["btn-style"]}
          >
            Sign up
          </Button>
        </div>
      </div>
      <AuthForm oversign="Log in" isLogIn={true} />
    </main>
  );
}
