import "../components/css/AddTask.css";
import Input from "../components/ui/Input";
import SelectBox from "../components/ui/SelectBox";

export default function AddTask() {
  return (
    <section className="container-addTask">
      <h1>Add Task</h1>
      <form className="form-addTask" action="post">
        <div className="input-field">
          <Input
            className="input"
            required={true}
            type="text"
            placeholder="Enter a title"
            labelText={
              <>
                Title<span style={{ color: "red" }}>*</span>
              </>
            }
          />
          <Input
            className="textArea"
            labelText="Description"
            required={false}
            type="text"
            placeholder="Enter a description"
          />
          <SelectBox
            className="select-container"
            text="Select contacts to assign"
            labelText="Assigned to"
          >
            <option value="1">Contact</option>
          </SelectBox>
        </div>
      </form>
    </section>
  );
}
