import "../css/Form.css";
import Input from "../ui/Input";
import person from "../../assets/image/person.png";
import mail from "../../assets/image/mail.png";
import lock from "../../assets/image/lock.png";
import Button from "../ui/Button";

type FormProps = {
  oversign: string;
  isLogIn: boolean;
};

export default function Form({ oversign, isLogIn }: FormProps) {
  return (
    <form action="">
      <div className="container-oversign">
        <h1>{oversign}</h1>
        <div className="vector"></div>
      </div>
      <div className="container-inputs">
        {!isLogIn && <Input logoPath={person} placeholder="Name" type="text" />}
        <Input logoPath={mail} placeholder="Email" type="email" />
        <Input logoPath={lock} placeholder="Password" type="password" />
        {!isLogIn && (
          <Input
            logoPath={lock}
            placeholder="Confirm Password"
            type="password"
          />
        )}
      </div>
      <div className="container-btn">
        <Button className="btn-login" valueText="Log in" href="" />
        <Button className="btn-guest" valueText="Guest Log in" href="" />
      </div>
    </form>
  );
}
