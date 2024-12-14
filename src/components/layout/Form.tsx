import "../css/Form.css";
import Input from "../ui/Input";
import person from "../../assets/image/person.png";
import mail from "../../assets/image/mail.png";
import lock from "../../assets/image/lock.png";
import leftArrow from "../../assets/image/arrowLeft.png";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

type FormProps = {
  oversign: string;
  isLogIn: boolean;
};

export default function Form({ oversign, isLogIn }: FormProps) {
  const navigate = useNavigate();

  function onClickBackHandler() {
    navigate("/");
  }
  return (
    <form action="">
      {!isLogIn && (
        <img
          onClick={onClickBackHandler}
          className="arrow-left"
          src={leftArrow}
          alt="left arrow"
        />
      )}
      <div className="container-oversign">
        <h1>{oversign}</h1>
        <div className="vector"></div>
      </div>
      <div className="container-inputs">
        {!isLogIn && (
          <Input
            logoPath={person}
            placeholder="Name"
            type="text"
            required={false}
          />
        )}
        <Input
          logoPath={mail}
          placeholder="Email"
          type="email"
          required={true}
        />
        <Input
          logoPath={lock}
          placeholder="Password"
          type="password"
          required={true}
        />
        {!isLogIn && (
          <Input
            logoPath={lock}
            placeholder="Confirm Password"
            type="password"
            required={true}
          />
        )}
      </div>
      <div className="container-btn">
        {isLogIn ? (
          <>
            <Button className="btn-login" href="">
              Log in
            </Button>
            <Button className="btn-guest" href="">
              Guest Log in
            </Button>
          </>
        ) : (
          <Button className="btn-login" href="">
            Sign up
          </Button>
        )}
      </div>
    </form>
  );
}
