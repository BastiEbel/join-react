import { Category } from "../types/Category";

export async function addCategory(category: Category) {
  const response = await fetch("http://localhost:3000/add-category", {
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

export async function getCategories() {
  const response = await fetch("http://localhost:3000/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  return data as Category[];
}
