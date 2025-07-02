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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useData } from "../../hooks/useData";
import OpenModal, { ModalHandle } from "../ui/OpenModal";
import AddCategory from "./AddCategory";
import { MultiValue, SingleValue } from "react-select";
import { AddTask, Contacts } from "../../types/AddTask";

export default function FormTask() {
  const btnStyling = useMemo(
    () => [
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
    ],
    []
  );

  const [changeStyling, setChangeStyling] = useState(btnStyling);
  const dialogRef = useRef<ModalHandle>(null);
  const [showMsg, setShowMsg] = useState(false);
  const [taskData, setTaskData] = useState<AddTask>({
    userId: "",
    title: "",
    description: "",
    dueDate: "",
    contacts: [],
    category: null,
    priority: "",
    subTasks: [],
  });
  const { contactData, categories, loadContactData, loadCategories } =
    useData();

  useEffect(() => {
    loadCategories();
    loadContactData();
  }, [loadCategories, loadContactData]);

  const onChangeBtnStyle = useCallback(
    (id: string) => {
      setChangeStyling((prev) =>
        prev.map((btnStyle) => {
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
        })
      );
      setTaskData((prev) => ({
        ...prev,
        priority: id,
      }));
    },
    [btnStyling]
  );

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

  function onClickCategoryHandler() {
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }

  function onCloseCategoryHandler() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function onChangeContactHandler(
    e:
      | MultiValue<{ value: string | undefined; label: string }>
      | SingleValue<{ value: string | undefined; label: string }>
  ) {
    let getValue: Contacts[] = [];
    if (Array.isArray(e) && e.length > 0) {
      e.map((item) => ({ value: item.value, label: item.label })).forEach(
        (item) => getValue.push(item)
      );
      setTaskData((prev) => ({
        ...prev,
        contacts: getValue,
      }));
      setShowMsg(true);
      return;
    } else {
      getValue = [];
      setShowMsg(false);
    }
  }

  function onChangeCategoryHandler(
    e:
      | MultiValue<{ value: string | undefined; label: string }>
      | SingleValue<{ value: string | undefined; label: string }>
  ) {
    if (e && !Array.isArray(e)) {
      const singleValue = e as { value: string | undefined; label: string };
      setTaskData((prev) => ({
        ...prev,
        category: {
          value: singleValue.value,
          label: singleValue.label,
        },
      }));
    } else {
      setTaskData((prev) => ({
        ...prev,
        category: null,
      }));
    }
  }

  function onHandleTitleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTaskData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  }

  function onHandleDescriptionChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTaskData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  }

  function onHandleDueDateChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTaskData((prev) => ({
      ...prev,
      dueDate: e.target.value,
    }));
  }

  function onClearHandler() {}

  function onCreateTaskHandler(e: React.FormEvent) {
    e.preventDefault();
    if (
      taskData.title.trim() === "" ||
      taskData.dueDate.trim() === "" ||
      taskData.category === null
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Task created:", taskData);
    onClearDataHandler();
  }

  function onClearDataHandler() {
    setTaskData({
      userId: "",
      title: "",
      description: "",
      dueDate: "",
      contacts: [],
      category: null,
      priority: "",
      subTasks: [],
    });
    setChangeStyling(btnStyling);
    setShowMsg(false);
  }

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
                value={taskData.title}
                onChange={onHandleTitleChange}
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
                textArea={true}
                required={false}
                onChange={onHandleDescriptionChange}
                value={taskData.description}
                type="text"
                placeholder="Enter a description"
              />
            </div>
            <div>
              <label
                id="contacts"
                style={{ fontSize: "20px", fontWeight: "400" }}
              >
                Assigned to
              </label>
              <SelectBox
                id="contacts"
                options={contactData.map((contact) => ({
                  value: contact.id,
                  label: contact.name,
                }))}
                value={taskData.contacts || []}
                placeholder="Select contacts to assign"
                isMulti={true}
                isSearchable={true}
                noOptionsMessage={() => "No contacts found"}
                onChange={onChangeContactHandler}
              />
              {showMsg && (
                <p style={{ color: "lightred" }}>
                  You can select more then one contact
                </p>
              )}
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
                onChange={onHandleDueDateChange}
                value={taskData.dueDate}
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
                    type="button"
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
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <label
                    style={{ fontSize: "20px", fontWeight: "400" }}
                    id="category"
                  >
                    Category
                  </label>
                  <span style={{ color: "red" }}>*</span>
                </div>
                <span
                  onClick={onClickCategoryHandler}
                  className="add-category-btn"
                >
                  Add Category
                </span>
              </div>
              <SelectBox
                id="category"
                isSearchable={false}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                value={taskData.category || null}
                placeholder="Select task category"
                onChange={onChangeCategoryHandler}
                noOptionsMessage={() => "No categories found"}
              />
            </div>
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
            <Button onClick={onCreateTaskHandler} className="create-btn">
              Create Task
              <img src={check} alt="X" />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
