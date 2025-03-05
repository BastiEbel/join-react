import logo from "../assets/image/joinLogo.png";
import "../components/css/Login.css";
import Form from "../components/layout/AuthForm";

export default function SignUp() {
  return (
    <main className="login-main">
      <div>
        <img className="logo-img" src={logo} alt="Logo Image" />
      </div>
      <Form oversign="Sign up" isLogIn={false} />
    </main>
  );
}
