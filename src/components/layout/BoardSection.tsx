import { useData } from "../../hooks/useData";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import OpenModal, { ModalHandle } from "../ui/OpenModal";

import FormTask from "./FormTask";
import TaskCard from "./TaskCard";

import plus from "../../assets/image/plus.png";

import styles from "../css/BoardSection.module.css";

import { AddTask } from "../../types/AddTask";
import { updateTaskStatus } from "../../utils/addTask";

type StatusType = "To Do" | "In Progress" | "Await Feedback" | "Done";
interface Task {
  id: string;
  status: StatusType;
  addTask: AddTask[];
}

export default function BoardSection() {
  const priorityItems = [
    { priority: "To Do", image: plus },
    { priority: "In Progress", image: "" },
    { priority: "Await Feedback", image: "" },
    { priority: "Done", image: "" },
  ];
  const dialogRef = useRef<ModalHandle>(null);
  const { addTasksLoad, loadAsyncTasksData } = useData();
  const { id } = useParams();

  const [tasksStatus, setTasksStatus] = useState<Record<StatusType, Task[]>>({
    "To Do": [],
    "In Progress": [],
    "Await Feedback": [],
    Done: [],
  });

  useEffect(() => {
    if (id) {
      loadAsyncTasksData(id);
    }
  }, [id, loadAsyncTasksData]);

  useEffect(() => {
    if (Array.isArray(addTasksLoad)) {
      const groupedTasks: Record<StatusType, Task[]> = {
        "To Do": [],
        "In Progress": [],
        "Await Feedback": [],
        Done: [],
      };
      addTasksLoad.forEach((addTask) => {
        if (!addTask.status) {
          console.warn("Task without status found:", addTask);
          return;
        }
        const status = addTask.status as StatusType;

        if (groupedTasks[status]) {
          groupedTasks[status].push({
            id: addTask.id,
            status: status,
            addTask: [addTask],
          });
        }
      });
      setTasksStatus(groupedTasks);
    }
  }, [addTasksLoad]);

  function onOpenTaskHandler() {
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  }

  function onCloseTaskHandler() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  async function onDragEnd(result: DropResult) {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId as StatusType;
    const destStatus = destination.droppableId as StatusType;

    const sourceList = Array.from(tasksStatus[sourceStatus]);
    const [removed] = sourceList.splice(source.index, 1);
    const destList = Array.from(tasksStatus[destStatus]);
    if (removed) {
      removed.status = destStatus;
      destList.splice(destination.index, 0, removed);

      try {
        await updateTaskStatus(removed.id, destStatus);
      } catch (e) {
        console.error("Fehler beim Status-Update:", e);
      }
    }

    setTasksStatus({
      ...tasksStatus,
      [sourceStatus]: sourceList,
      [destStatus]: destList,
    });
  }

  return (
    <>
      <OpenModal ref={dialogRef}>
        <FormTask onClose={onCloseTaskHandler} />
      </OpenModal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles["board-section"]}>
          {priorityItems.map((prioItem) => (
            <Droppable droppableId={prioItem.priority} key={prioItem.priority}>
              {(provided) => (
                <div
                  className={styles["prioTask"]}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  key={prioItem.priority}
                >
                  <div className={styles["board-priority"]}>
                    <label>{prioItem.priority}</label>
                    {prioItem.image !== "" && (
                      <img
                        key={prioItem.image}
                        onClick={onOpenTaskHandler}
                        src={prioItem.image}
                        alt="Plus"
                      />
                    )}
                  </div>
                  <div className={styles["board-task"]}>
                    {(tasksStatus[prioItem.priority as StatusType] ?? []).map(
                      (task: Task, idx: number) => (
                        <Draggable
                          draggableId={task.id}
                          index={idx}
                          key={task.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard addTask={task.addTask[0]} />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
