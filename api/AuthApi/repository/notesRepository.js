import { notesDb } from "../config/index.js";

const notesRepository = {
  getNotes: async () => {
    return notesDb.prepare("SELECT * FROM notes").all();
  },
  getNoteById: async ({ id }) => {
    return notesDb.prepare("SELECT * FROM notes WHERE id = ?").get(id);
  },
  createNote: async ({ id, notes, createdAt }) => {
    const newNote = notesDb
      .prepare("INSERT INTO notes (id, notes, createdAt) VALUES (?, ?, ?)")
      .run(id, notes.toLowerCase(), createdAt);

    return newNote.lastInsertRowid;
  },
  deleteNote: async ({ id }) => {
    const noteChange = notesDb
      .prepare("DELETE FROM notes WHERE id like ?")
      .run(id);
    return noteChange.changes;
  },
  updateNote: async ({ id, notes }) => {
    const noteChanges = notesDb
      .prepare("UPDATE notes SET notes = ? WHERE id like ?")
      .run(notes.toLowerCase(), id);

    return noteChanges.changes;
  },
};

export default notesRepository;
