import logo from "../assets/image/joinLogo.png";
import Button from "../components/ui/Button";
import "../components/css/Login.css";
import Form from "../components/layout/Form";

export default function Login() {
  return (
    <main className="login-main">
      <div>
        <img className="logo-img" src={logo} alt="Logo Image" />
        <div className="container-signup">
          <p>Not a Join user?</p>
          <Button disabled={false} href="/signup" className="btn-style">
            Sign up
          </Button>
        </div>
      </div>
      <Form oversign="Log in" isLogIn={true} />
    </main>
  );
}
