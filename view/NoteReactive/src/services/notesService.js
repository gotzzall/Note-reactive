const NOTE_URL = "http://localhost:4042/api";
const NOTE_PATH = "notes";

export const notesService = {
  getNotes: async () => {
    const response = await fetch(`${NOTE_URL}/${NOTE_PATH}`);
    const data = await response.json();
    return data;
  },
  addNote: async (note) => {
    const response = await fetch(`${NOTE_URL}/${NOTE_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data = await response.json();
    return data;
  },
  deleteNote: async (id) => {
    await fetch(`${NOTE_URL}/${NOTE_PATH}/${id}`, {
      method: "DELETE",
    });

    return id;
  },
  updateNote: async (note) => {
    await fetch(`${NOTE_URL}/${NOTE_PATH}/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    return note;
  },
};
