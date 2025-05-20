import { ContactData } from "../types/ContactData";
import { User } from "../types/User";

export async function addContact(contactData: ContactData) {
  try {
    const response = await fetch("http://localhost:3000/add-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}

export async function getContact(user: User) {
  try {
    const response = await fetch(`http://localhost:3000/contacts/${user.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.statusText}`
      );
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}

export async function deleteContact(contactId: string) {
  try {
    const response = await fetch(`http://localhost:3000/delete-contact`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ contactId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
