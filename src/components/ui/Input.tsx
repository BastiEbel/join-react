import "../css/Input.css";

type InputProps = {
  logoPath: string;
  placeholder: string;
  type: string;
};

export default function Input({ logoPath, placeholder, type }: InputProps) {
  return (
    <div className="container-input">
      <input placeholder={placeholder} className="" type={type} />
      <img src={logoPath} alt="Logo for Input" />
    </div>
  );
}
