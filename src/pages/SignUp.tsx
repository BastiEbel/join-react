import logo from "../assets/image/joinLogo.png";
import "../components/css/Login.css";
import Form from "../components/layout/Form";

export default function SignUp() {
  return (
    <main>
      <header>
        <img className="logo-img" src={logo} alt="Logo Image" />
      </header>
      <Form oversign="Sign up" isLogIn={false} />
    </main>
  );
}
