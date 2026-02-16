import notes from "../db/notes";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const notesService = {
  getNotes: async () => {
    await sleep(RandomInt(1000, 3000));
    return notes;
  },
  addNote: async (note) => {
    await sleep(RandomInt(1000, 3000));
    const newNote = {...note, id: crypto.randomUUID()}
    notes.push(newNote);
    return newNote;
  },
  deleteNote: async (id) => {
    await sleep(RandomInt(1000, 3000));
    const index = notes.findIndex(item => item.id == id);
    notes.splice(index, 1);
    return id;
  },
  updateNote: async (note) => {
    await sleep(RandomInt(1000, 3000));
    const index = notes.findIndex(item => item.id == note.id);
    notes[index] = note;
    return note;
  }
} 