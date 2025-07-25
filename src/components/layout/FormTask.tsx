import styles from "../css/FormTask.module.css";

import Button from "../ui/Button";
import Input from "../ui/Input";
import SelectBox from "../ui/SelectBox";
import OpenModal, { ModalHandle } from "../ui/OpenModal";

import urgent from "../../assets/image/urgent.png";
import medium from "../../assets/image/medium.png";
import low from "../../assets/image/low.png";
import urgentWhite from "../../assets/image/urgentWhite.png";
import mediumWhite from "../../assets/image/mediumWhite.png";
import lowWhite from "../../assets/image/lowWhite.png";
import clear from "../../assets/image/clear.png";
import hoverclear from "../../assets/image/hoverclear.png";
import check from "../../assets/image/check.png";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useData } from "../../hooks/useData";
import { MultiValue, SingleValue } from "react-select";
import { useNavigate, useParams } from "react-router-dom";

import AddCategory from "./AddCategory";
import { AddTask, Contacts } from "../../types/AddTask";

type MoadlTaskProps = {
  onClose?: (() => void | undefined) | undefined;
};

export default function FormTask({ onClose }: MoadlTaskProps) {
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
  const navigate = useNavigate();
  const [changeStyling, setChangeStyling] = useState(btnStyling);
  const dialogRef = useRef<ModalHandle>(null);
  const [showMsg, setShowMsg] = useState(false);
  const { id } = useParams();
  const [taskData, setTaskData] = useState<AddTask>({
    userId: "",
    title: "",
    description: "",
    dueDate: "",
    contacts: [],
    category: null,
    prio: "",
    status: "",
  });
  const {
    contactData,
    categories,
    loadContactData,
    loadCategories,
    addAsyncTask,
  } = useData();

  useEffect(() => {
    loadCategories();
    loadContactData();
    if (id) {
      setTaskData((prev) => ({
        ...prev,
        userId: id,
        status: "To Do",
      }));
    }
  }, [loadCategories, loadContactData, id]);

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
        prio: id,
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

  function onOpenCategoryHandler() {
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

  function onClearHandler() {
    onClearDataHandler();
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 100);
    }
  }

  async function onCreateTaskHandler(e: React.FormEvent) {
    e.preventDefault();
    if (
      taskData.title.trim() === "" ||
      taskData.dueDate.trim() === "" ||
      taskData.category === null
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await addAsyncTask(taskData);
      if (response) {
        navigate(`/board/${taskData.userId}`);
      } else {
        alert("Failed to create task. Please try again.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
      return;
    }

    onClearDataHandler();
  }

  function onClearDataHandler() {
    if (taskData !== undefined) {
      setTaskData({
        userId: "",
        title: "",
        description: "",
        dueDate: "",
        contacts: [],
        category: null,
        prio: "",
        status: "",
      });
    }
    setChangeStyling(btnStyling);
    setShowMsg(false);
  }

  return (
    <>
      <OpenModal ref={dialogRef}>
        <AddCategory onClose={onCloseCategoryHandler} />
      </OpenModal>
      <form id="task" className={styles["form-addTask"]} action="post">
        <section className={styles["container-task"]}>
          <div className={styles["container-left"]}>
            <div>
              <Input
                name="title"
                className={styles["input"]}
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
                className={styles["textArea"]}
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
          <div className={styles["spacer-addTask"]}></div>
          <div className={styles["priority-section"]}>
            <div>
              <Input
                name="dueDate"
                className={styles["selectDate"]}
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
              <label className={styles["title-prio"]}>Prio</label>
              <div className={styles["btn-group"]}>
                {changeStyling.map((btnItem) => (
                  <Button
                    type="button"
                    onClick={() => onChangeBtnStyle(btnItem.name)}
                    key={btnItem.name}
                    style={{
                      background: btnItem.bgColor,
                      color: btnItem.color,
                    }}
                    className={styles["btn-prio"]}
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
                  onClick={onOpenCategoryHandler}
                  className={styles["add-category-btn"]}
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
          </div>
        </section>
        <div className={styles["form-footer"]}>
          <label>
            <span>*</span>This field is required
          </label>
          <div className={styles["submitting-btn"]}>
            <Button
              mouseOver={(e) => onMouseOverHandler(e)}
              mouseLeave={(e) => onMouseLeaveHandler(e)}
              onClick={onClearHandler}
              className={styles["clear-btn"]}
            >
              Clear
              <img src={clear} alt="X" />
            </Button>
            <Button
              onClick={onCreateTaskHandler}
              className={styles["create-btn"]}
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
