import { useState } from "react";
import hookblack from "../../assets/image/hookblack.png";
import pencilblack from "../../assets/image/pencilblack.png";
import styles from "../css/ContainerSummary.module.css";

type ContainerProps = {
  width: string;
  image?: string;
  amount: number;
  description: string;
  date?: string;
  title?: string;
  className: string;
};

export default function Container({
  image,
  amount,
  description,
  date,
  title,
  width,
}: ContainerProps) {
  const [changeImage, setChangeImage] = useState(image);

  function onChangeImage() {
    if (image) {
      const lastSegment = image.split("/").pop();
      const pencilImage = "pencilwhite.png";
      const hookImage = "hookwhite.png";

      if (lastSegment === pencilImage) {
        setChangeImage(pencilblack);
      } else if (lastSegment === hookImage) {
        setChangeImage(hookblack);
      }
    }
  }

  function onMouseLeaveHandler() {
    setChangeImage(image);
  }

  return (
    <div
      onMouseLeave={onMouseLeaveHandler}
      onMouseOver={onChangeImage}
      style={{ width: width }}
      className={styles["summary-item"]}
    >
      {image && (
        <div
          style={{ background: "#FF3D00" }}
          className={styles["summary-image"]}
        >
          <img
            style={date ? { width: "34px", height: "25px" } : undefined}
            src={changeImage}
            alt={description}
          />
        </div>
      )}
      <div className={styles["summary-content"]}>
        <p className={styles["amount"]}>{amount}</p>
        <p className={styles["description"]}>{description}</p>
      </div>
      {date && (
        <>
          <div className={styles["spacer"]}></div>
          <div className={styles["summary-content"]}>
            <p className={styles["dateTime"]}>{date}</p>
            <p className={styles["dateTimeFinish"]}>{title}</p>
          </div>
        </>
      )}
    </div>
  );
}
