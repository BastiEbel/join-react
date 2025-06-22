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
import clear from "../../assets/image/clear.png";
import hoverclear from "../../assets/image/hoverclear.png";
import check from "../../assets/image/check.png";
import { useRef, useState } from "react";
import { useData } from "../../hooks/useData";
import OpenModal, { ModalHandle } from "../ui/OpenModal";
import AddCategory from "./AddCategory";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const dialogRef = useRef<ModalHandle>(null);
  const { contactData } = useData();

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

  function onMouseOverHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.src = hoverclear;
    }
  }

  function onMouseLeaveHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.src = clear;
    }
  }

  function onClickCategoryHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSelectedCategory(e.target.value);
    if (dialogRef.current && e.target.value === "add") {
      console.log("Category clicked", e.target.value);
      dialogRef.current.open();
    }
  }

  function onCloseCategoryHandler() {
    setSelectedCategory("");
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function onClearHandler() {}

  function onCreateTaskHandler() {}

  return (
    <>
      <OpenModal ref={dialogRef}>
        <AddCategory onClose={onCloseCategoryHandler} />
      </OpenModal>
      <form id="task" className="form-addTask" action="post">
        <section className="container-task">
          <div className="container-left">
            <div>
              <Input
                name="title"
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
                name="description"
                className="textArea"
                labelText="Description"
                required={false}
                type="text"
                placeholder="Enter a description"
              />
            </div>
            <div>
              <SelectBox
                id="contacts"
                className="select-container"
                text="Select contacts to assign"
                labelText="Assigned to"
              >
                {contactData.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name}
                  </option>
                ))}
              </SelectBox>
            </div>
          </div>
          <div className="spacer-addTask"></div>
          <div className="priority-section">
            <div>
              <Input
                name="dueDate"
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
              <label className="title-prio">Prio</label>
              <div className="btn-group">
                {changeStyling.map((btnItem) => (
                  <Button
                    onClick={() => onChangeBtnStyle(btnItem.name)}
                    key={btnItem.name}
                    style={{
                      background: btnItem.bgColor,
                      color: btnItem.color,
                    }}
                    className="btn-prio"
                  >
                    {btnItem.name}
                    <img src={btnItem.image} alt={btnItem.name} />
                  </Button>
                ))}
              </div>
            </div>
            <SelectBox
              id="category"
              className="select-container"
              text="Select task category"
              onChange={onClickCategoryHandler}
              value={selectedCategory}
              labelText={
                <>
                  Category<span style={{ color: "red" }}>*</span>
                </>
              }
            >
              <option value="add">Add Category</option>
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
        </section>
        <div className="form-footer">
          <label>
            <span>*</span>This field is required
          </label>
          <div className="submitting-btn">
            <Button
              mouseOver={(e) => onMouseOverHandler(e)}
              mouseLeave={(e) => onMouseLeaveHandler(e)}
              onClick={onClearHandler}
              className="clear-btn"
            >
              Clear
              <img src={clear} alt="X" />
            </Button>
            <Button
              onClick={onCreateTaskHandler}
              disabled
              className="create-btn"
            >
              Create Task
              <img src={check} alt="X" />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
