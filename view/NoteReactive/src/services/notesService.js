const NOTE_API_URL = import.meta.env.VITE_NOTE_API_URL;
import fetchWithAuth from "../tools/fetchWithAuth";

export const notesService = {
  getNotes: async () => {
    const response = await fetchWithAuth(NOTE_API_URL, {
      method: "GET",
      credentials: "include",
    });
    return response;
  },
  addNote: async (note) => {
    const response = await fetchWithAuth(NOTE_API_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    return response;
  },
  deleteNote: async (id) => {
    await fetchWithAuth(`${NOTE_API_URL}/${id}`, {
      method: "DELETE",
    });

    return id;
  },
  updateNote: async (note) => {
    await fetchWithAuth(`${NOTE_API_URL}/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    return note;
  },
};
