import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import search from "../assets/image/search.png";
import add from "../assets/image/add.png";
import plus from "../assets/image/plus.png";
import "../components/css/Board.css";
import BoardSection from "../components/layout/BoardSection";

export default function Board() {
  const priorityItems = [
    { priority: "To Do", image: plus },
    { priority: "In Progress", image: plus },
    { priority: "Await Feedback", image: plus },
    { priority: "Done", image: "" },
  ];

  function onClickHandler() {}
  return (
    <main className="container-board">
      <header className="header-board">
        <h1>Board</h1>
        <div className="section-search-task">
          <div className="input-findTask">
            <Input
              type="text"
              placeholder="Find Task"
              required={false}
              className="find-task"
              icon={search}
            />
          </div>
          <Button onClick={onClickHandler} className="btn-addTask">
            Add Task <img src={add} alt="Add" />
          </Button>
        </div>
      </header>
      <section className="container-board-task">
        {priorityItems.map((prioItem) => (
          <BoardSection
            priority={prioItem.priority}
            image={prioItem.image}
            key={prioItem.priority}
          ></BoardSection>
        ))}
      </section>
    </main>
  );
}
