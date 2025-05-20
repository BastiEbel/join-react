import { ContactData } from "../../types/ContactData";
import Button from "./Button";
import styles from "../css/InformationBox.module.css";

interface ContactInfoProps {
  info: ContactData;
  title: string;
  btnName: string;
  description?: string;
  onClose: () => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function InformationBox({
  info,
  title,
  description,
  onClose,
  btnName,
  onClick,
}: ContactInfoProps) {
  return (
    <div className={styles.infoBox}>
      <h1 className={styles.title}>{title}</h1>
      {description && <span className={styles.description}>{description}</span>}
      <div className={styles.contactRow}>
        <p className={styles.contactLabel}>Kontakt:</p>
        <span className={styles.contactName}>{info.name}</span>
      </div>
      <div className={styles.buttonRow}>
        <Button onClick={onClose} className={styles.closeBtn}>
          Schließen
        </Button>
        <Button onClick={onClick} className={styles.actionBtn}>
          {btnName}
        </Button>
      </div>
    </div>
  );
}
