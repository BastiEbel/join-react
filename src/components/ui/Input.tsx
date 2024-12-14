import "../css/Input.css";

type InputProps = {
  logoPath: string;
  placeholder: string;
  required: boolean;
  type: string;
};

export default function Input({
  logoPath,
  placeholder,
  type,
  required,
}: InputProps) {
  return (
    <div className="container-input">
      <input
        placeholder={placeholder}
        className=""
        type={type}
        required={required}
      />
      <img src={logoPath} alt="Logo for Input" />
    </div>
  );
}
