import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import search from "../assets/image/search.png";
import add from "../assets/image/add.png";
import styles from "../components/css/Board.module.css";
import BoardSection from "../components/layout/BoardSection";
import { useNavigate, useParams } from "react-router-dom";

export default function Board() {
  const { id } = useParams();
  const navigate = useNavigate();
  function onClickHandler() {
    navigate(`/addTask/${id}`);
  }
  return (
    <main className={styles["container-board"]}>
      <header className={styles["header-board"]}>
        <h1>Board</h1>
        <div className={styles["section-search-task"]}>
          <div className={styles["input-findTask"]}>
            <Input
              type="text"
              placeholder="Find Task"
              required={false}
              className={styles["find-task"]}
              icon={search}
            />
          </div>
          <Button onClick={onClickHandler} className={styles["btn-addTask"]}>
            Add Task <img src={add} alt="Add" />
          </Button>
        </div>
      </header>
      <section className={styles["container-board-task"]}>
        <BoardSection />
      </section>
    </main>
  );
}
