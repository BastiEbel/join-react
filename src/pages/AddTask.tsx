import "../components/css/AddTask.css";
import Input from "../components/ui/Input";

export default function AddTask() {
  return (
    <section className="container-addTask">
      <h1>Add Task</h1>
      <form className="form-addTask" action="post">
        <div>
          <Input
            className="input"
            required={true}
            type="text"
            placeholder="Title"
            labelText="Title*"
          />
        </div>
      </form>
    </section>
  );
}
