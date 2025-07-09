import { useData } from "../../hooks/useData";
import TaskCard from "./TaskCard";
import plus from "../../assets/image/plus.png";
import styles from "../css/BoardSection.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BoardSection() {
  const priorityItems = [
    { priority: "To Do", image: plus },
    { priority: "In Progress", image: plus },
    { priority: "Await Feedback", image: plus },
    { priority: "Done", image: "" },
  ];
  const { addTasksLoad, loadAsyncTasksData } = useData();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadAsyncTasksData(id);
    }
  }, [id, loadAsyncTasksData]);

  return (
    <div className={styles["board-section"]}>
      {priorityItems.map((prioItem) => (
        <div className={styles["prioTask"]} key={prioItem.priority}>
          <div className={styles["board-priority"]}>
            <label>{prioItem.priority}</label>
            {prioItem.image !== "" && <img src={prioItem.image} alt="Plus" />}
          </div>
          <div className={styles["board-task"]}>
            {prioItem.priority === "To Do" &&
              Array.isArray(addTasksLoad) &&
              addTasksLoad.map((task) => (
                <TaskCard key={task.id} addTask={task} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
