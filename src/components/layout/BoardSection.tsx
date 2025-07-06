import { useData } from "../../hooks/useData";

export default function BoardSection(prioItem: {
  priority: string;
  image: string;
}) {
  const { addTasksLoad } = useData();

  console.log("Loaded tasks:", addTasksLoad);

  return (
    <>
      <div className="prioTask">
        <label>{prioItem.priority}</label>
        {prioItem.image !== "" && <img src={prioItem.image} alt="Plus" />}
      </div>
      <div className="board-task"></div>
    </>
  );
}
