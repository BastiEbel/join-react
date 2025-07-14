import { AddTask } from "../types/AddTask";

export async function addTask(taskData: AddTask) {
  try {
    const response = await fetch("http://localhost:3000/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...taskData, status: taskData.status || "To Do" }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

export async function updateTaskStatus(id: string, status: string) {
  try {
    const response = await fetch("http://localhost:3000/update-task-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
}

export async function loadTasks(userId: string, contactId?: string) {
  try {
    const url = new URL("http://localhost:3000/load-tasks");
    if (userId) url.searchParams.append("userId", userId);
    if (contactId) url.searchParams.append("contactId", contactId);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading tasks:", error);
    throw error;
  }
}
