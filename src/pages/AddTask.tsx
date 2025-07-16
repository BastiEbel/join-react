import styles from "../components/css/AddTask.module.css";
import FormTask from "../components/layout/FormTask";

export default function AddTask() {
  return (
    <section className={styles["container-addTask"]}>
      <h1>Add Task</h1>
      <FormTask />
    </section>
  );
}
