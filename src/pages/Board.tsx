import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import search from "../assets/image/search.png";
import add from "../assets/image/add.png";
import "../components/css/Board.css";
import BoardSection from "../components/layout/BoardSection";

export default function Board() {
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
        <BoardSection />
      </section>
    </main>
  );
}
