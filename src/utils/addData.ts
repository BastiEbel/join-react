import { ContactData } from "../types/ContactData";

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

export async function getContact(userId: string) {
  try {
    const response = await fetch(`http://localhost:3000/contacts/${userId}`, {
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
    console.log("Fetched contact data:", data);

    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
