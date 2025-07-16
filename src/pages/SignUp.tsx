import logo from "../assets/image/joinLogo.png";
import styles from "../components/css/Login.module.css";
import Form from "../components/layout/AuthForm";

export default function SignUp() {
  return (
    <main className={styles["login-main"]}>
      <div>
        <img className={styles["logo-img"]} src={logo} alt="Logo Image" />
      </div>
      <Form oversign="Sign up" isLogIn={false} />
    </main>
  );
}
