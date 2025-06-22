import { Category } from "../types/Category";

export async function addCategory(category: Category) {
  const response = await fetch("/add-category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Failed to add category");
  }
  const data = await response.json();
  return data;
}
