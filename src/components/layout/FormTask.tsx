import "../css/FormTask.css";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SelectBox from "../ui/SelectBox";
import urgent from "../../assets/image/urgent.png";
import medium from "../../assets/image/medium.png";
import low from "../../assets/image/low.png";
import urgentWhite from "../../assets/image/urgentWhite.png";
import mediumWhite from "../../assets/image/mediumWhite.png";
import lowWhite from "../../assets/image/lowWhite.png";
import plusTask from "../../assets/image/plus.png";
import { useState } from "react";

export default function FormTask() {
  const btnStyling = [
    {
      name: "Urgent",
      bgColor: "#ffffff",
      color: "#000000",
      image: urgent,
    },
    {
      name: "Medium",
      bgColor: "#ffffff",
      color: "#000000",
      image: medium,
    },
    { name: "Low", bgColor: "#ffffff", color: "#000000", image: low },
  ];

  const [changeStyling, setChangeStyling] = useState(btnStyling);

  function onChangeBtnStyle(id: string) {
    const updateStyling = changeStyling.map((btnStyle) => {
      if (id === btnStyle.name) {
        if (btnStyle.name === "Urgent") {
          return {
            ...btnStyle,
            bgColor: "#FF3D00",
            color: "#ffffff",
            image: urgentWhite,
          };
        } else if (btnStyle.name === "Medium") {
          return {
            ...btnStyle,
            bgColor: "#FFA800",
            color: "#ffffff",
            image: mediumWhite,
          };
        } else if (btnStyle.name === "Low") {
          return {
            ...btnStyle,
            bgColor: "#7AE229",
            color: "#ffffff",
            image: lowWhite,
          };
        }
      }
      return {
        ...btnStyle,
        bgColor: "#ffffff",
        color: "#000000",
        image:
          btnStyling.find((b) => b.name === btnStyle.name)?.image ||
          btnStyle.image,
      };
    });

    setChangeStyling(updateStyling);
  }

  return (
    <form className="form-addTask" action="post">
      <div className="container-left">
        <div>
          <Input
            className="input"
            required
            type="text"
            placeholder="Enter a title"
            labelText={
              <>
                Title<span style={{ color: "red" }}>*</span>
              </>
            }
          />
        </div>
        <div>
          <Input
            className="textArea"
            labelText="Description"
            required={false}
            type="text"
            placeholder="Enter a description"
          />
        </div>
        <div>
          <SelectBox
            className="select-container"
            text="Select contacts to assign"
            labelText="Assigned to"
          >
            <option value="1">Contact</option>
          </SelectBox>
        </div>
      </div>
      <div className="spacer-addTask"></div>
      <div className="container-right">
        <div>
          <Input
            className="selectDate"
            required={true}
            type="date"
            placeholder="dd/mm/yyyy"
            labelText={
              <>
                Due date<span style={{ color: "red" }}>*</span>
              </>
            }
          />
        </div>
        <div>
          <p className="title-prio">Prio</p>
          <div className="container-btn-prio">
            {changeStyling.map((btnItem) => (
              <Button
                onClick={() => onChangeBtnStyle(btnItem.name)}
                key={btnItem.name}
                style={{ background: btnItem.bgColor, color: btnItem.color }}
                className="btn-prio"
              >
                {btnItem.name}
                <img src={btnItem.image} alt="Urgent" />
              </Button>
            ))}
          </div>
        </div>
        <SelectBox
          className="select-container"
          text="Select task category"
          labelText={
            <>
              Category<span style={{ color: "red" }}>*</span>
            </>
          }
        >
          <option value="1">Contact</option>
        </SelectBox>
        <div>
          <Input
            required={false}
            labelText="Subtasks"
            icon={plusTask}
            placeholder="Add new subtask"
            type="text"
            className="input-subtask"
          />
        </div>
      </div>
    </form>
  );
}